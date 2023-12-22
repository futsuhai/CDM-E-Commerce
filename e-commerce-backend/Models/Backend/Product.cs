namespace e_commerce_backend.Models.Backend
{
    public class Product
    {
        public Guid Id { get; set; }
        public double CardPrice { get; set; } = 0;
        public double CommonPrice { get; set; } = 0;
        public required string Title { get; set; } = string.Empty;
        public int Rating { get; set; } = 0;
        public int Discount { get; set; } = 0;
        public required string Country { get; set; } = string.Empty;
        public required string Brand { get; set; } = string.Empty;
        public int Weight { get; set; } = 0;
        public int Articul { get; set; } = 0;
        public required byte[] ImageBytes { get; set; }
        public required ProductTag ProductTag { get; set; } = ProductTag.none;
    }
}