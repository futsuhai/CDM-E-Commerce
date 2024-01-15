using e_commerce_backend.Models.Backend;
using e_commerce_backend.Repository.ProductRepository;

namespace e_commerce_backend.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(
            IProductRepository productRepository
        )
        {
            _productRepository = productRepository;
        }
        public async Task<IList<Product>> GetProductByCategoryAsync(ProductCategory productCategory)
        {
            var products = await _productRepository.GetAllAsync();
            var productsInCategory = products.Where(p => p.ProductCategory == productCategory).ToList();
            return productsInCategory;
        }
        public async Task<IList<Product>> SearchAsync(FilterProperties filterProperties)
        {
            var products = await _productRepository.GetAllAsync();

            if (filterProperties != null)
            {
                if (filterProperties.MinPrice.HasValue)
                {
                    products = products.Where(product => product.CardPrice >= filterProperties.MinPrice.Value).ToList();
                }

                if (filterProperties.MaxPrice.HasValue)
                {
                    products = products.Where(product => product.CardPrice <= filterProperties.MaxPrice.Value).ToList();
                }

                if (filterProperties.Categories != null && filterProperties.Categories.Any())
                {
                    products = products
                        .Where(product => filterProperties.Categories.Contains(product.ProductCategory.ToString()))
                        .ToList();
                }

                if (filterProperties.Tags != null && filterProperties.Tags.Any())
                {
                    products = products
                        .Where(product => filterProperties.Tags.Contains(product.ProductTag.ToString()))
                        .ToList();
                }

                if (!string.IsNullOrEmpty(filterProperties.Title))
                {
                    products = products
                        .Where(product => product.Title.Contains(filterProperties.Title, StringComparison.OrdinalIgnoreCase))
                        .ToList();
                }
            }
            return products;
        }

        public async Task<IList<Product>> GetAllAsync() =>
            await _productRepository.GetAllAsync();

        public async Task<Product> GetAsync(Guid id) =>
            await _productRepository.GetAsync(id);

        public async Task DeleteAsync(Guid id) =>
             await _productRepository.DeleteAsync(id);

        public async Task UpdateAsync(Guid id, Product item) =>
            await _productRepository.UpdateAsync(id, item);

        public async Task CreateAsync(Product item) =>
            await _productRepository.CreateAsync(item);
    }
}