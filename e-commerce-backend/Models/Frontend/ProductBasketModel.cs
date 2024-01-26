namespace e_commerce_backend.Models.Frontend
{
    public class ProductBasketModel
    {
        public required ProductModel Product { get; set; }
        public required int Count { get; set; }
        public required double FinalPrice { get; set; }
        public required bool IsChecked { get; set; }
    }
}