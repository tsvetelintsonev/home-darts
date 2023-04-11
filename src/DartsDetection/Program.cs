// See https://aka.ms/new-console-template for more information

using System.Diagnostics;
using OpenCvSharp;

Console.WriteLine("Hello, World!");

var image = Cv2.ImRead("./images/dartboard.png");
var outputImage = new Mat();

var inputImageArray = InputArray.Create(image);
var outputImageArray = OutputArray.Create(outputImage);

Cv2.CvtColor(inputImageArray, outputImageArray, ColorConversionCodes.BGR2HSV);

var lowerGreenRgb = Mat.FromArray(45,100,20);
var upperGreenRgb = Mat.FromArray(75,255,255);

Cv2.InRange(inputImageArray, lowerGreenRgb, upperGreenRgb, OutputArray.Create(outputImage));

var newOutputImage = new Mat();

var kernel = Cv2.GetStructuringElement(MorphShapes.Ellipse, new Size(40, 40));
Cv2.MorphologyEx(outputImage, OutputArray.Create(newOutputImage),MorphTypes.Open, kernel, iterations: 3);
Cv2.MorphologyEx(outputImage, OutputArray.Create(newOutputImage), MorphTypes.Close, kernel);

Cv2.ImWrite("greenMaskDartboardImage.jpeg", newOutputImage);
Cv2.ImWrite("greenMaskDartboardImageOld.jpeg", outputImage);

for (var colIndex = 0; colIndex < outputImage.Cols; colIndex++)
{
    for (var rowIndex = 0; rowIndex < outputImage.Rows; rowIndex++)
    {
        var test = outputImage.At<double>(rowIndex, colIndex);

        if (test == 0)
        {
            continue;
        }

        Console.WriteLine($"{test} ");
    }
}

Console.ReadKey();
