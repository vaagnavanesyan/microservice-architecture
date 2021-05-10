using OpenCvSharp;
using System;
using System.Collections.Generic;
using System.IO;


namespace ImageProcessor
{
    class Program
    {
        static void Main(string[] args)
        {
            using var source = new Mat("048.jpg", ImreadModes.Color);
            var file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Cascades", "haarcascade_frontalface_default.xml");
            CascadeClassifier faceCascade = new CascadeClassifier();
            faceCascade.Load(file);
            var faceRects = faceCascade.DetectMultiScale(source, 1.2, 6, HaarDetectionTypes.DoRoughSearch, new Size(64, 64));
            var faces = new List<byte[]>();
            for (int i = 0; i < faceRects.Length; i++)
            {
                var face = new Mat(source, faceRects[i]);
                faces.Add(face.ToBytes(".jpg"));
                face.SaveImage(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "face" + i + ".jpg"), new ImageEncodingParam(ImwriteFlags.JpegProgressive, 255));
                Console.WriteLine($"Saved {i}");
            }
        }
    }
}


