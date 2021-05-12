using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Minio;
using OpenCvSharp;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
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
    private readonly ConnectionFactory _factory;
    private readonly MinioClient _minioClient;
    private IModel _channel;

    public Worker(ILogger<Worker> logger, IConfiguration configuration, ConnectionFactory factory, MinioClient minioClient)
    {
      _logger = logger;
      _factory = factory;
      _minioClient = minioClient;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
      var queueName = "processing-queue";
      using var connection = _factory.CreateConnection();
      _channel = connection.CreateModel();
      _channel.QueueDeclare(queue: queueName, durable: true, exclusive: false, autoDelete: false, arguments: null);
      _channel.QueueBind(queue: queueName, exchange: "amq.direct", routingKey: "OrderReadyToProcessEvent");

      var consumer = new AsyncEventingBasicConsumer(_channel);
      consumer.Received += OnMessageReceived;
      _channel.BasicConsume(queue: queueName, autoAck: false, consumer: consumer);
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
        _logger.LogInformation($"Message contains {message.ImageObjectPaths.Length} image(-s)");

        for (int i = 0; i < message.ImageObjectPaths.Length; i++)
        {
          string imagePath = message.ImageObjectPaths[i];
          var memoryStream = new MemoryStream();
          _logger.LogInformation($"Processing image {i + 1}/{message.ImageObjectPaths.Length}...");
          await _minioClient.GetObjectAsync("images", imagePath, stream => stream.CopyTo(memoryStream));

          var source = Mat.FromImageData(memoryStream.ToArray());

          var faceCascade = new CascadeClassifier();
          var file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Cascades", "haarcascade_frontalface_default.xml");
          faceCascade.Load(file);
          faceCascade.DetectMultiScale(source).ToList().ForEach(face => source.Rectangle(face, Scalar.Red, 4));


          var sourceStream = source.ToMemoryStream();
          await _minioClient.PutObjectAsync("images", imagePath.Replace("original", "processed"), sourceStream, sourceStream.Length);
        }
        _logger.LogInformation("Message processed");
        _channel.BasicAck(e.DeliveryTag, false);
      }
      catch (Exception ex)
      {
        _logger.LogError("Something went wrong when processing message: ", ex.Message);
      }
    }
  }
}