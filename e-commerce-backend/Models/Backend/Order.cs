namespace e_commerce_backend.Models.Backend
{
    public class Order
    {
        public List<ProductBasket> OrderProducts { get; set; } = new List<ProductBasket>();
        public required double OrderPrice { get; set; }
        public required OrderStatus OrderStatus { get; set; }
    }
}