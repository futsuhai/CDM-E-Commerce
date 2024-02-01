namespace e_commerce_backend.Models.Backend
{
    public class Account
    {
        public Guid Id { get; set; }
        public string Login { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Family { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string HashPassword { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Salt { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime? Date { get; set; }
        public required Adress Adress { get; set; }
        public required Guid Avatar { get; set; }
        public required Tokens Tokens { get; set; }
        public required Role Role { get; set; }
        public required AccountData AccountData { get; set; } = new AccountData();
    }
}