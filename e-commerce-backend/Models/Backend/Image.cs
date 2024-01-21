namespace e_commerce_backend.Models.Backend
{
    public class Image
    {
        public Guid Id { get; set; }
        public required byte[] Img { get; set; }
    }
}