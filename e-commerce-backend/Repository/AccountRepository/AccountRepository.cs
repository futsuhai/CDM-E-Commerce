using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Options;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace e_commerce_backend.Repository.AccountRepository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IMongoCollection<Account> _accountCollection;

        public AccountRepository(IOptions<DatabaseOptions> ECommerceDatabaseSettings)
        {
            var mongoClient = new MongoClient(ECommerceDatabaseSettings.Value.ConnectionString);
            var database = mongoClient.GetDatabase(ECommerceDatabaseSettings.Value.DatabaseName);
            _accountCollection = database.GetCollection<Account>(ECommerceDatabaseSettings.Value.AccountsCollectionName);
        }
        public async Task CreateAsync(Account item) =>
            await _accountCollection.InsertOneAsync(item);

        public async Task DeleteAsync(Guid id) =>
            await _accountCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<IList<Account>> GetAllAsync() =>
            await _accountCollection.Find(_ => true).ToListAsync();

        public async Task<Account> GetAsync(Guid id) =>
            await _accountCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task UpdateAsync(Guid id, Account item) =>
            await _accountCollection.ReplaceOneAsync(x => x.Id == id, item);
    }
}