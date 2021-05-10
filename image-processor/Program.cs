using OpenCvSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

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
            var faceRects = faceCascade.DetectMultiScale(source, 1.1, 9, HaarDetectionTypes.DoRoughSearch, new Size(64, 64));
            var faces = new List<byte[]>();
            for (int i = 0; i < faceRects.Length; i++)
            {
                source.Rectangle(faceRects[i], Scalar.Red, 4);
            }
            source.SaveImage(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "048-2.jpg"), new ImageEncodingParam(ImwriteFlags.JpegProgressive, 255));
        }
    }
}


