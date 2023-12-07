using e_commerce_backend.Models.Backend;
using MongoDB.Driver;

namespace e_commerce_backend.Init
{
    public static class DatabaseInitializer
    {
        public static void InitializeDatabase()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("E-Commerce");

            // Инициализация коллекций
            InitializeArticles(database);
            InitializeProducts(database);
        }

        private static void InitializeArticles(IMongoDatabase database)
        {
            var collection = database.GetCollection<Article>("Articles");
        }

        private static void InitializeProducts(IMongoDatabase database)
        {
            var collection = database.GetCollection<Product>("Products");
        }
    }
}