namespace e_commerce_backend.Models.Backend
{
    public class Account
    {
        public Guid Id { get; set; }

        public string Login { get; set; } = string.Empty;

        public string HashPassword { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Salt { get; set; } = string.Empty;

        public Tokens? Tokens { get; set; }
    }
}