using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageProcessor
{
  public class OrderReadyToProcessEventConsumer
  {
    private readonly ILogger<OrderReadyToProcessEventConsumer> _logger;
    private readonly ConnectionFactory _factory;

    public OrderReadyToProcessEventConsumer(ILogger<OrderReadyToProcessEventConsumer> logger, ConnectionFactory factory)
    {
      _logger = logger;
      _factory = factory;
    }

    public async Task RegisterConsumer(System.Threading.CancellationToken stoppingToken)
    {
      var queueName = "processing-queue";
      using (var connection = _factory.CreateConnection())
      using (var channel = connection.CreateModel())
      {
        channel.QueueDeclare(queue: queueName, durable: true, exclusive: false, autoDelete: false, arguments: null);
        channel.QueueBind(queue: queueName, exchange: "amq.direct", routingKey: "OrderReadyToProcessEvent");

        var consumer = new EventingBasicConsumer(channel);
        consumer.Registered += (sender, e) => _logger.LogInformation("Consumer registered");
        consumer.Received += OnMessageReceived;
        channel.BasicConsume(queue: queueName, autoAck: true, consumer: consumer);
        while (!stoppingToken.IsCancellationRequested)
        {
          await Task.Delay(500);
        }
      }
    }

    private void OnMessageReceived(object sender, BasicDeliverEventArgs e)
    {
      var message = Encoding.UTF8.GetString(e.Body.ToArray());
      Console.WriteLine(" [x] Received {0}", message);
    }
  }
}
