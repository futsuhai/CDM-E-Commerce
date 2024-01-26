namespace e_commerce_backend.Models.Frontend
{
    public class OrderModel
    {
        public List<ProductBasketModel> OrderProducts { get; set; }= new List<ProductBasketModel>();
        public required double OrderPrice { get; set; }
        public required string OrderStatus { get; set; }
    }
}