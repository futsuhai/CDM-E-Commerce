using e_commerce_backend.Models.Backend;

namespace e_commerce_backend.Services.AccountService
{
    public interface IAccountService : IService<Account>
    {
        public Task<Account?> GetAccountByLoginAsync(string login);
        public Task<Dictionary<string, string>> CheckDuplicateAccounts(string login, string email);
    }
}