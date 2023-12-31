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
                    CardPrice = 150.5,
                    CommonPrice = 170,
                    Title = "Колбаса ПАПА МОЖЕТ мясная",
                    Rating = 5,
                    Discount = 15,
                    Country = "Россия",
                    Brand = "ПАПА МОЖЕТ",
                    Weight = 200,
                    Articul = 371431,
                    ProductByteImages = ImageUtils.SetImagesFromFiles(
                        new List<string>
                        {
                            "InitAssets/product-1-1.jpg",
                            "InitAssets/product-1-2.jpg",
                            "InitAssets/product-1-3.jpg",
                        }
                    ),
                    ProductMainByteImage = ImageUtils.SetImageFromFile(
                        "InitAssets/product-1-1.jpg"),
                    ProductTag = ProductTag.sales,
                    ProductCategory = ProductCategory.meat,
                    Rewievs = new List<Rewiev>
                    {
                        new ()
                        {
                            Username = "Алексей",
                            Date = DateTime.Now.AddDays(-5),
                            Rating = 5,
                            Description = "Отличная колбаса, покупаю уже не первый раз."
                        },
                        new ()
                        {
                            Username = "Анна",
                            Date = DateTime.Now.AddDays(-7),
                            Rating = 4,
                            Description = "Самая вкусная колбаса, но дороговато"
                        },
                    }
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 50.5,
                    CommonPrice = 55.5,
                    Title = "Молоко ПРОСТОКВАШИНО паст.",
                    Rating = 5,
                    Discount = 20,
                    Country = "Россия",
                    Brand = "ПРОСТОКВАШИНО",
                    Weight = 950,
                    Articul = 371432,
                    ProductByteImages = ImageUtils.SetImagesFromFiles(
                        new List<string>
                        {
                            "InitAssets/product-2.jpg"
                        }
                    ),
                    ProductMainByteImage = ImageUtils.SetImageFromFile(
                        "InitAssets/product-2.jpg"),
                    ProductTag = ProductTag.sales,
                    ProductCategory = ProductCategory.lactic,
                    Rewievs = new List<Rewiev>()
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 50.5,
                    CommonPrice = 55.5,
                    Title = "Сальчичон Тоскана",
                    Rating = 5,
                    Discount = 20,
                    Country = "Россия",
                    Brand = "Тоскана",
                    Weight = 140,
                    Articul = 371433,
                    ProductByteImages = ImageUtils.SetImagesFromFiles(
                        new List<string>
                        {
                            "InitAssets/product-3.jpg"
                        }
                    ),
                    ProductMainByteImage = ImageUtils.SetImageFromFile(
                        "InitAssets/product-3.jpg"),
                    ProductTag = ProductTag.sales,
                    ProductCategory = ProductCategory.meat,
                    Rewievs = new List<Rewiev>()
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 50.5,
                    CommonPrice = 55.5,
                    Title = "Сыр Йогуртовый Белебеевский",
                    Rating = 4,
                    Discount = 30,
                    Country = "Россия",
                    Brand = "Белебеевский Комбинат",
                    Weight = 120,
                    Articul = 371434,
                    ProductByteImages = ImageUtils.SetImagesFromFiles(
                        new List<string>
                        {
                            "InitAssets/product-4.jpg"
                        }
                    ),
                    ProductMainByteImage = ImageUtils.SetImageFromFile(
                        "InitAssets/product-4.jpg"),
                    ProductTag = ProductTag.sales,
                    ProductCategory = ProductCategory.lactic,
                    Rewievs = new List<Rewiev>()
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 190.5,
                    CommonPrice = 200,
                    Title = "Макароны Barilla 297",
                    Rating = 5,
                    Country = "Россия",
                    Brand = "Barilla",
                    Weight = 200,
                    Articul = 371431,
                    ProductByteImages = ImageUtils.SetImagesFromFiles(
                        new List<string>
                        {
                            "InitAssets/product-5.jpg"
                        }
                    ),
                    ProductMainByteImage = ImageUtils.SetImageFromFile(
                        "InitAssets/product-5.jpg"),
                    ProductTag = ProductTag.news,
                    ProductCategory = ProductCategory.grocery,
                    Rewievs = new List<Rewiev>()
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 120.5,
                    CommonPrice = 130.5,
                    Title = "Макароны Макфа Паутинка",
                    Rating = 5,
                    Country = "Россия",
                    Brand = "Макфа",
                    Weight = 200,
                    Articul = 371431,
                    ProductByteImages = ImageUtils.SetImagesFromFiles(
                        new List<string>
                        {
                            "InitAssets/product-6.jpg"
                        }
                    ),
                    ProductMainByteImage = ImageUtils.SetImageFromFile(
                        "InitAssets/product-6.jpg"),
                    ProductTag = ProductTag.news,
                    ProductCategory = ProductCategory.grocery,
                    Rewievs = new List<Rewiev>()
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 79.5,
                    CommonPrice = 89.5,
                    Title = "Масло Подсолнечное ПРОСТО",
                    Rating = 5,
                    Country = "Россия",
                    Brand = "ПРОСТО",
                    Weight = 700,
                    Articul = 371431,
                    ProductByteImages = ImageUtils.SetImagesFromFiles(
                        new List<string>
                        {
                            "InitAssets/product-7.jpg"
                        }
                    ),
                    ProductMainByteImage = ImageUtils.SetImageFromFile(
                        "InitAssets/product-7.jpg"),
                    ProductTag = ProductTag.news,
                    ProductCategory = ProductCategory.beverages,
                    Rewievs = new List<Rewiev>()
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 49.5,
                    CommonPrice = 60,
                    Title = "Сырок творожный РОСАГРОКОМПЛЕКС",
                    Rating = 5,
                    Country = "Россия",
                    Brand = "РОСАГРОКОМПЛЕКС",
                    Weight = 40,
                    Articul = 371431,
                    ProductByteImages = ImageUtils.SetImagesFromFiles(
                        new List<string>
                        {
                            "InitAssets/product-8.jpg"
                        }
                    ),
                    ProductMainByteImage = ImageUtils.SetImageFromFile(
                        "InitAssets/product-8.jpg"),
                    ProductTag = ProductTag.news,
                    ProductCategory = ProductCategory.lactic,
                    Rewievs = new List<Rewiev>()
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 130.5,
                    CommonPrice = 150,
                    Title = "Колбаса докторская Стародворье",
                    Rating = 5,
                    Country = "Россия",
                    Brand = "Стародворье",
                    Weight = 300,
                    Articul = 371439,
                    ProductByteImages = ImageUtils.SetImagesFromFiles(
                        new List<string>
                        {
                            "InitAssets/product-9.jpg"
                        }
                    ),
                    ProductMainByteImage = ImageUtils.SetImageFromFile(
                        "InitAssets/product-9.jpg"),
                    ProductTag = ProductTag.none,
                    ProductCategory = ProductCategory.meat,
                    Rewievs = new List<Rewiev>()
                },
                new()
                {
                    Id =  Guid.NewGuid(),
                    CardPrice = 250,
                    CommonPrice = 300,
                    Title = "Котлеты из говядины Мираторг Black Angus",
                    Rating = 5,
                    Country = "Россия",
                    Brand = "Мираторг",
                    Weight = 150,
                    Articul = 371438,
                    ProductByteImages = ImageUtils.SetImagesFromFiles(
                        new List<string>
                        {
                            "InitAssets/product-10.jpg"
                        }
                    ),
                    ProductMainByteImage = ImageUtils.SetImageFromFile(
                        "InitAssets/product-10.jpg"),
                    ProductTag = ProductTag.none,
                    ProductCategory = ProductCategory.meat,
                    Rewievs = new List<Rewiev>()
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