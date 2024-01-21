using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Options;
using e_commerce_backend.Repository.ImageRepository;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace e_commerce_backend.Repository.ProductRepository
{
    public class ImageRepository : IImageRepository
    {

        private readonly IMongoCollection<Image> _imageCollection;
        public ImageRepository(IOptions<DatabaseOptions> ECommerceDatabaseSettings)
        {
            var mongoClient = new MongoClient(ECommerceDatabaseSettings.Value.ConnectionString);
            var database = mongoClient.GetDatabase(ECommerceDatabaseSettings.Value.DatabaseName);
            _imageCollection = database.GetCollection<Image>(ECommerceDatabaseSettings.Value.ImagesCollectionName);
        }

        public async Task CreateAsync(Image item) =>
            await _imageCollection.InsertOneAsync(item);

        public async Task DeleteAsync(Guid id) =>
            await _imageCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<IList<Image>> GetAllAsync() =>
            await _imageCollection.Find(_ => true).ToListAsync();

        public async Task<Image> GetAsync(Guid id) =>
             await _imageCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task UpdateAsync(Guid id, Image item) =>
            await _imageCollection.ReplaceOneAsync(x => x.Id == id, item);
    }
}