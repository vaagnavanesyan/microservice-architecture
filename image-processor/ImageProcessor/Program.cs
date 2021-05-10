using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageProcessor
{
  public class Program
  {
    public static void Main(string[] args)
    {
      CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((hostContext, services) =>
            {
              services.AddHostedService<Worker>();
              services.AddSingleton<OrderReadyToProcessEventConsumer>();
              services.AddSingleton(context =>
              {
                var rmqSettings = hostContext.Configuration.GetSection("RabbitMQ");
                var hostname = rmqSettings.GetValue<string>("HostName");
                var username = rmqSettings.GetValue<string>("UserName");
                var password = rmqSettings.GetValue<string>("Password");
                return new ConnectionFactory() { HostName = hostname, UserName = username, Password = password };
              });
            });
  }
}
