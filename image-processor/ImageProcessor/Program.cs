using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Minio;
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
              services.AddSingleton(context =>
              {
                return new MinioClient("localhost:9000",
                "minio",
                "b75794cba71f409f8ed8ea2528857736"
                );
              });
              services.AddSingleton(context =>
              {
                var rmqSettings = hostContext.Configuration.GetSection("RabbitMQ");
                var hostname = rmqSettings.GetValue<string>("HostName");
                var username = rmqSettings.GetValue<string>("UserName");
                var password = rmqSettings.GetValue<string>("Password");
                return new ConnectionFactory() { HostName = hostname, UserName = username, Password = password , DispatchConsumersAsync = true};
              });
            });
  }
}
