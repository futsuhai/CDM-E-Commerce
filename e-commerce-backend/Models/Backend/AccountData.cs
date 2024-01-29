namespace e_commerce_backend.Models.Backend
{
    public class AccountData
    {
        public List<Product> Liked { get; set; } = new List<Product>();
        public List<ProductBasket> Basket { get; set; }= new List<ProductBasket>();
        public List<string> Orders { get; set; }= new List<string>();
    }
}