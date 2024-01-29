using e_commerce_backend.Models.Backend;

namespace e_commerce_backend.Models.Frontend
{
    public class OrderModel
    {
        public string? Id { get; set; }
        public List<ProductBasketModel> OrderProducts { get; set; }= new List<ProductBasketModel>();
        public required double OrderPrice { get; set; }
        public required string OrderStatus { get; set; }
        public required OrderInfo OrderInfo { get; set; }
    }
}