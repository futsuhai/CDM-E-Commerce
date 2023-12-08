using e_commerce_backend.Models.Backend;
using e_commerce_backend.Utils.ImageUtils;
using MongoDB.Driver;

namespace e_commerce_backend.Init
{
    public static class DatabaseInitializer
    {
        public static void InitializeDatabase()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("E-Commerce");

            if (!CollectionExists(database, "Articles"))
            {
                InitializeArticles(database);
            }

            if (!CollectionExists(database, "Products"))
            {
                InitializeProducts(database);
            }
        }

        private static void InitializeArticles(IMongoDatabase database)
        {
            var collection = database.GetCollection<Article>("Articles");
            var articles = new List<Article>
            {
                new()
                {
                    Id =  Guid.NewGuid(),
                    Date = DateTime.Now,
                    Title = "Режим использования масок и перчаток на территории магазинов",
                    Main = "Подробная информация о режимах использования масок и перчаток на территории магазинов ЛЕНТА. Информация обновляется каждый будний день.",
                    ImageBytes = ImageUtils.SetImageFromFile("InitAssets/article-image1.jpg")
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    Date = DateTime.Now,
                    Title = "Весеннее настроение для каждой",
                    Main = "Сегодня замечательный день! 8 Марта – это не просто Международный женский день, это ещё день тюльпанов, приятных сюрпризов и праздничных тёплых пожеланий.",
                    ImageBytes = ImageUtils.SetImageFromFile("InitAssets/article-image2.jpg")
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    Date = DateTime.Now,
                    Title = "ЗОЖ или ФАСТФУД. А вы на чьей стороне? Голосуем!",
                    Main = "Голосуйте за любимые категории, выбирайте категорию-победителя в мобильном приложении и получайте кешбэк 10% баллами в апреле!",
                    ImageBytes = ImageUtils.SetImageFromFile("InitAssets/article-image3.jpg")
                },
            };
            collection.InsertMany(articles);
        }

        private static void InitializeProducts(IMongoDatabase database)
        {
            var collection = database.GetCollection<Product>("Products");
            var products = new List<Product>
            {
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 50.5,
                    CommonPrice = 55.5,
                    Title = "Г/Ц Блинчики с мясом вес",
                    Rating = 5,
                    Country = "Россия",
                    ImageBytes = ImageUtils.SetImageFromFile("InitAssets/product-1.jpg")
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 50.5,
                    CommonPrice = 55.5,
                    Title = "Г/Ц Блинчики с мясом вес",
                    Rating = 5,
                    Country = "Россия",
                    ImageBytes = ImageUtils.SetImageFromFile("InitAssets/product-2.jpg")
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 50.5,
                    CommonPrice = 55.5,
                    Title = "Г/Ц Блинчики с мясом вес",
                    Rating = 5,
                    Country = "Россия",
                    ImageBytes = ImageUtils.SetImageFromFile("InitAssets/product-3.jpg")
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 50.5,
                    CommonPrice = 55.5,
                    Title = "Г/Ц Блинчики с мясом вес",
                    Rating = 4,
                    Country = "Россия",
                    ImageBytes = ImageUtils.SetImageFromFile("InitAssets/product-4.jpg")
                },
            };
            collection.InsertMany(products);
        }
        private static bool CollectionExists(IMongoDatabase database, string collectionName)
        {
            var collections = database.ListCollectionNames().ToList();
            return collections.Contains(collectionName);
        }
    }
}