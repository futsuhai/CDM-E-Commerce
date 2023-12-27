namespace e_commerce_backend.Models.Backend
{
    public class RewievModel
    {
        public required string Username { get; set; }
        public required DateTime Date { get; set; }
        public required int Rating { get; set; }
        public string? Description { get; set; }
    }
}