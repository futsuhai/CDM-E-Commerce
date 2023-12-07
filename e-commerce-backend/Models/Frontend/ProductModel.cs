namespace e_commerce_backend.Models.Frontend
{
    public class ProductModel
    {
        public required string Id { get; set; }
        public double CardPrice { get; set; } = 0;
        public double CommonPrice { get; set; } = 0;
        public required string Title { get; set; } = string.Empty;
        public int Rating { get; set; } = 0;
        public required string Country { get; set; } = string.Empty;
        public required string Base64Image { get; set; } = string.Empty;
    }
}