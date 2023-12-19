using e_commerce_backend.Models.Backend;
using e_commerce_backend.Repository.AccountRepository;

namespace e_commerce_backend.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;

        public AccountService(
            IAccountRepository accountRepository
        )
        {
            _accountRepository = accountRepository;
        }

        public async Task<Account?> GetAccountByLoginAsync(string login)
        {
            var accounts = await _accountRepository.GetAllAsync();
            var account = accounts.FirstOrDefault(a => a.Login == login);
            if (account == null)
            {
                return null;
            }
            return account;
        }

        public async Task<Dictionary<string, string>> CheckDuplicateAccounts(string login, string email)
        {
            var accounts = await _accountRepository.GetAllAsync();
            var errors = new Dictionary<string, string>();

            if (accounts.Any(x => x.Login == login))
            {
                errors["loginError"] = "Аккаунт с таким логином уже существует";
            }

            if (accounts.Any(x => x.Email == email))
            {
                errors["emailError"] = "Аккаунт с таким адресом электронной почты уже существует";
            }

            return errors;
        }


        public async Task<IList<Account>> GetAllAsync() =>
            await _accountRepository.GetAllAsync();

        public async Task<Account> GetAsync(Guid id) =>
            await _accountRepository.GetAsync(id);

        public async Task DeleteAsync(Guid id) =>
            await _accountRepository.DeleteAsync(id);

        public async Task UpdateAsync(Guid id, Account item) =>
            await _accountRepository.UpdateAsync(id, item);

        public async Task CreateAsync(Account item) =>
            await _accountRepository.CreateAsync(item);
    }
}