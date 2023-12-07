using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Options;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace e_commerce_backend.Repository.ProductRepository
{
    public class ProductRepository : IProductRepository
    {

        private readonly IMongoCollection<Product> _productCollection;
        public ProductRepository(IOptions<DatabaseOptions> ECommerceDatabaseSettings)
        {
            var mongoClient = new MongoClient(ECommerceDatabaseSettings.Value.ConnectionString);
            var database = mongoClient.GetDatabase(ECommerceDatabaseSettings.Value.DatabaseName);
            _productCollection = database.GetCollection<Product>(ECommerceDatabaseSettings.Value.ProductsCollectionName);
        }

        public async Task CreateAsync(Product item) =>
            await _productCollection.InsertOneAsync(item);

        public async Task DeleteAsync(Guid id) =>
            await _productCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<IList<Product>> GetAllAsync() =>
            await _productCollection.Find(_ => true).ToListAsync();

        public async Task<Product> GetAsync(Guid id) =>
             await _productCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task UpdateAsync(Guid id, Product item) =>
            await _productCollection.ReplaceOneAsync(x => x.Id == id, item);
    }
}