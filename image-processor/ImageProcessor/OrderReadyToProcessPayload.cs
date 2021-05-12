namespace ImageProcessor
{
  public class OrderReadyToProcessPayload
  {
    public int OrderId { get; set; }
    public string[] ImageObjectPaths { get; set; }
  }
}
