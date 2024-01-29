using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Options;
using e_commerce_backend.Repository.OrderRepository;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace e_commerce_backend.Repository.ProductRepository
{
    public class OrderRepository : IOrderRepository
    {

        private readonly IMongoCollection<Order> _orderCollection;
        public OrderRepository(IOptions<DatabaseOptions> ECommerceDatabaseSettings)
        {
            var mongoClient = new MongoClient(ECommerceDatabaseSettings.Value.ConnectionString);
            var database = mongoClient.GetDatabase(ECommerceDatabaseSettings.Value.DatabaseName);
            _orderCollection = database.GetCollection<Order>(ECommerceDatabaseSettings.Value.OrdersCollectionName);
        }

        public async Task CreateAsync(Order item) =>
            await _orderCollection.InsertOneAsync(item);

        public async Task DeleteAsync(Guid id) =>
            await _orderCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<IList<Order>> GetAllAsync() =>
            await _orderCollection.Find(_ => true).ToListAsync();

        public async Task<Order> GetAsync(Guid id) =>
             await _orderCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task UpdateAsync(Guid id, Order item) =>
            await _orderCollection.ReplaceOneAsync(x => x.Id == id, item);
    }
}