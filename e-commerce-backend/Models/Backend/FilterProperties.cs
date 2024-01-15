namespace e_commerce_backend.Models.Backend
{
    public class FilterProperties
    {
        public string? Title { get; set; }
        public int? MinPrice { get; set; }
        public int? MaxPrice { get; set; }
        public List<string>? Tags { get; set; }
        public List<string>? Categories { get; set; }
    }
}