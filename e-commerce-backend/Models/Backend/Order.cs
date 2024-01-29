namespace e_commerce_backend.Models.Backend
{
    public class Order
    {
        public required Guid Id { get; set; }
        public List<ProductBasket> OrderProducts { get; set; } = new List<ProductBasket>();
        public required double OrderPrice { get; set; }
        public required OrderStatus OrderStatus { get; set; }
        public required OrderInfo OrderInfo { get; set; }
    }
}