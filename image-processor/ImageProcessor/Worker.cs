using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OpenCvSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace ImageProcessor
{
  public class Worker : BackgroundService
  {
    private readonly ILogger<Worker> _logger;
    private readonly IConfiguration _configuration;
    private readonly OrderReadyToProcessEventConsumer _rabbitMQConsumer;

    public Worker(ILogger<Worker> logger, IConfiguration configuration, IHostEnvironment env, OrderReadyToProcessEventConsumer rabbitMQConsumer)
    {
      _logger = logger;
      _configuration = configuration;
      _rabbitMQConsumer = rabbitMQConsumer;
      if (env.IsProduction())
      {
        // read from env
      }
      else
      {
      }

    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
      await _rabbitMQConsumer.RegisterConsumer(stoppingToken);
      using var source = new Mat("048.jpg", ImreadModes.Color);
      var file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Cascades", "haarcascade_frontalface_default.xml");
      CascadeClassifier faceCascade = new CascadeClassifier();
      faceCascade.Load(file);
      var faceRects = faceCascade.DetectMultiScale(source, 1.1, 9, HaarDetectionTypes.DoRoughSearch, new Size(64, 64));
      for (int i = 0; i < faceRects.Length; i++)
      {
        source.Rectangle(faceRects[i], Scalar.Red, 4);
      }
      source.SaveImage(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "048-2.jpg"), new ImageEncodingParam(ImwriteFlags.JpegProgressive, 255));
    }
  }
}
