namespace e_commerce_backend.Models.Options
{
    public class DatabaseOptions
    {
        public string ProductsCollectionName { get; set; } = string.Empty;
        public string ImagesCollectionName { get; set; } = string.Empty;
        public string ArticlesCollectionName { get; set; } = string.Empty;
        public string AccountsCollectionName { get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
    }
}