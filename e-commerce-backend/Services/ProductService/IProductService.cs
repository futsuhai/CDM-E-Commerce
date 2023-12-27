using e_commerce_backend.Models.Backend;

namespace e_commerce_backend.Services.ProductService
{
    public interface IProductService : IService<Product>
    {
        public Task<List<Product>> GetProductByCategoryAsync(ProductCategory productCategory);
    }
}