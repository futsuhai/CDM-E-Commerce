using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Options;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace e_commerce_backend.Repository.ProductRepository
{
    public class ArticleRepository : IArticleRepository
    {

        private readonly IMongoCollection<Article> _articleCollection;
        public ArticleRepository(IOptions<DatabaseOptions> ECommerceDatabaseSettings)
        {
            var mongoClient = new MongoClient(ECommerceDatabaseSettings.Value.ConnectionString);
            var database = mongoClient.GetDatabase(ECommerceDatabaseSettings.Value.DatabaseName);
            _articleCollection = database.GetCollection<Article>(ECommerceDatabaseSettings.Value.ArticlesCollectionName);
        }

        public async Task CreateAsync(Article item) =>
            await _articleCollection.InsertOneAsync(item);

        public async Task DeleteAsync(Guid id) =>
            await _articleCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<IList<Article>> GetAllAsync() =>
            await _articleCollection.Find(_ => true).ToListAsync();

        public async Task<Article> GetAsync(Guid id) =>
             await _articleCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task UpdateAsync(Guid id, Article item) =>
            await _articleCollection.ReplaceOneAsync(x => x.Id == id, item);
    }
}