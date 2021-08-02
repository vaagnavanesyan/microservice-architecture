namespace ImageProcessor
{
  public class OrderReadyToProcessPayload
  {
    public int OrderId { get; set; }
    public Image[] Images { get; set; }
    public string PayerEmail { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
  }

  public class Image
  {
    public int Id { get; set; }
    public string FileName { get; set; }
    public string ObjectPath { get; set; }
    public int PositionId { get; set; }
  }
}
