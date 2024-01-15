using e_commerce_backend.Models.Backend;

namespace e_commerce_backend.Services.ProductService
{
    public interface IProductService : IService<Product>
    {
        public Task<IList<Product>> GetProductByCategoryAsync(ProductCategory productCategory);
        public Task<IList<Product>> SearchAsync(FilterProperties filterProperties);
    }
}