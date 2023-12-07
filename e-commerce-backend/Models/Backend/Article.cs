namespace e_commerce_backend.Models.Backend
{
    public class Article
    {
        public Guid Id { get; set; }
        public required DateTime Date { get; set; }
        public required string Title { get; set; } = string.Empty;
        public required string Main { get; set; } = string.Empty;
        public required string Base64Image { get; set; } = string.Empty;
    }
}