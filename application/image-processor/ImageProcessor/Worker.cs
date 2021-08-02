using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Minio;
using OpenCvSharp;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace ImageProcessor
{
  public class Worker : BackgroundService
  {
    private readonly ILogger<Worker> _logger;
    private readonly IConfiguration _configuration;
    private readonly ConnectionFactory _factory;
    private readonly MinioClient _minioClient;
    private IModel _processingQueue;
    private IModel _ordersQueue;

    public Worker(ILogger<Worker> logger, IConfiguration configuration, ConnectionFactory factory, MinioClient minioClient)
    {
      _logger = logger;
      _configuration = configuration;
      _factory = factory;
      _minioClient = minioClient;


    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
      var rmqSettings = _configuration.GetSection("RabbitMQ");

      var ordersQueue = rmqSettings.GetValue<string>("OrdersQueue");
      var processingQueue = rmqSettings.GetValue<string>("ProcessingQueue");


      using var connection = _factory.CreateConnection();
      _processingQueue = connection.CreateModel();
      _processingQueue.QueueDeclare(queue: processingQueue, durable: true, exclusive: false, autoDelete: false, arguments: null);
      _processingQueue.QueueBind(queue: processingQueue, exchange: "amq.direct", routingKey: "OrderReadyToProcessEvent");

      var consumer = new AsyncEventingBasicConsumer(_processingQueue);
      _processingQueue.BasicConsume(queue: processingQueue, autoAck: false, consumer: consumer);
      consumer.Received += OnMessageReceived;

      _ordersQueue = connection.CreateModel();

      while (!stoppingToken.IsCancellationRequested)
      {
        await Task.Delay(500);
      }
    }

    private async Task OnMessageReceived(object sender, BasicDeliverEventArgs e)
    {
      try
      {
        var json = Encoding.UTF8.GetString(e.Body.ToArray());
        _logger.LogInformation("Received message");

        var message = JsonSerializer.Deserialize<OrderReadyToProcessPayload>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        _logger.LogInformation($"Message contains {message.Images.Length} position(-s)");
        var processedImages = new List<dynamic>();
        for (int i = 0; i < message.Images.Length; i++)
        {
          var image = message.Images[i];
          string imagePath = image.ObjectPath;
          var memoryStream = new MemoryStream();
          _logger.LogInformation($"Processing image {i + 1}/{message.Images.Length}...");
          await _minioClient.GetObjectAsync("images", imagePath, stream => stream.CopyTo(memoryStream));

          var source = Mat.FromImageData(memoryStream.ToArray());

          var faceCascade = new CascadeClassifier();
          var file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Cascades", "haarcascade_frontalface_default.xml");
          faceCascade.Load(file);
          faceCascade.DetectMultiScale(source).ToList().ForEach(face => source.Rectangle(face, Scalar.Red, 4));


          var sourceStream = source.ToMemoryStream();
          var processedObjectPath = imagePath.Replace("original", "processed");
          await _minioClient.PutObjectAsync("images", processedObjectPath, sourceStream, sourceStream.Length);
          processedImages.Add(new
          {
            positionId = image.PositionId,
            processedObjectPath = processedObjectPath
          });
        }
        _logger.LogInformation("Message processed");
        //TODO: to lowercase
        var payload = JsonSerializer.Serialize(new
        {
          orderId = message.OrderId,
          payerEmail = message.PayerEmail,
          positions = processedImages,
          firstName = message.FirstName,
          lastName = message.LastName
        });

        _ordersQueue.BasicPublish(exchange: "amq.direct", routingKey: "OrderProcessedEvent", basicProperties: null, body: Encoding.UTF8.GetBytes(payload));
        _processingQueue.BasicAck(e.DeliveryTag, false);
      }
      catch (Exception ex)
      {
        _logger.LogError("Something went wrong when processing message: ", ex.Message);
      }
    }
  }
}