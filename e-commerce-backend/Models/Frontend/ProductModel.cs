using e_commerce_backend.Models.Backend;

namespace e_commerce_backend.Models.Frontend
{
    public class ProductModel
    {
        public required string Id { get; set; }
        public double CardPrice { get; set; } = 0;
        public double CommonPrice { get; set; } = 0;
        public required string Title { get; set; } = string.Empty;
        public int Rating { get; set; } = 0;
        public int Discount { get; set; } = 0;
        public required string Country { get; set; } = string.Empty;
        public required string Brand { get; set; } = string.Empty;
        public int Weight { get; set; } = 0;
        public int Articul { get; set; } = 0;
        public List<string> Product64Images { get; set; } = new List<string>();
        public string ProductMain64Image { get; set; } = string.Empty;
        public required string ProductTag { get; set; } = string.Empty;
        public required string ProductCategory { get; set; } = string.Empty;
        public required List<Rewiev> Rewievs { get; set; }
    }
}