namespace e_commerce_backend.Models.Frontend
{
    public class AccountDataModel
    {
        public List<ProductModel> Liked { get; set; } = new List<ProductModel>();
        public List<ProductBasketModel> Basket { get; set; }= new List<ProductBasketModel>();
        public List<OrderModel> Orders { get; set; }= new List<OrderModel>();
    }
}