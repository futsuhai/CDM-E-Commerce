using e_commerce_backend.Models.Backend;

namespace e_commerce_backend.Models.Frontend
{
    public class AccountModel
    {
        public Guid Id { get; set; }
        public string Login { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Family { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime? Date { get; set; }
        public Adress? Adress { get; set; }
        public Guid Avatar { get; set; }   
        public Tokens? Tokens { get; set; }
        public string? Role { get; set; }
    }
}