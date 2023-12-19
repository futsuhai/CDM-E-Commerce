using e_commerce_backend.Models.Backend;

namespace e_commerce_backend.Models.Frontend
{
    public class AccountModel
    {
        public Guid Id { get; set; }

        public string Login { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public Tokens? Tokens { get; set; }
    }
}