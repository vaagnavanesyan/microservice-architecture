namespace ImageProcessor
{
  public class OrderReadyToProcessPayload
  {
    public int OrderId { get; set; }
    public string[] ImageObjectPaths { get; set; }
    public string PayerEmail { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
  }
}
