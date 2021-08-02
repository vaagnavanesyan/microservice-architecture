using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Minio;
using RabbitMQ.Client;

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
             .ConfigureAppConfiguration((hostingContext, config) =>
             {
               config.AddEnvironmentVariables(prefix: "IMAGE_PROCESSOR_");
             })
            .ConfigureServices((hostContext, services) =>
            {
              services.AddHostedService<Worker>();
              services.AddSingleton(context =>
              {
                var minioSettings = hostContext.Configuration.GetSection("Minio");
                var endpoint = minioSettings.GetValue<string>("Endpoint");
                var accessKey = minioSettings.GetValue<string>("AccessKey");
                var secretKey = minioSettings.GetValue<string>("SecretKey");

                return new MinioClient(endpoint,
                accessKey,
                secretKey
                );
              });
              services.AddSingleton(context =>
              {
                var rmqSettings = hostContext.Configuration.GetSection("RabbitMQ");
                var hostname = rmqSettings.GetValue<string>("HostName");
                var username = rmqSettings.GetValue<string>("UserName");
                var password = rmqSettings.GetValue<string>("Password");

                return new ConnectionFactory() { HostName = hostname, UserName = username, Password = password, DispatchConsumersAsync = true };
              });
            });
  }
}
