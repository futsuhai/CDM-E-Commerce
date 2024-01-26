namespace e_commerce_backend.Models.Backend
{
    public class ProductBasket
    {
        public required Product Product { get; set; }
        public required int Count { get; set; }
        public required double FinalPrice { get; set; }
        public required bool IsChecked { get; set; }
    }
}