using e_commerce_backend.Models.Backend;
using e_commerce_backend.Repository.ImageRepository;
using e_commerce_backend.Repository.ProductRepository;
using e_commerce_backend.Services.ImageService;

namespace e_commerce_backend.Services.ProductService
{
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;

        public ImageService(
            IImageRepository imageRepository
        )
        {
            _imageRepository = imageRepository;
        }

        public async Task<IList<Image>> GetAllAsync() =>
            await _imageRepository.GetAllAsync();

        public async Task<Image> GetAsync(Guid id) =>
            await _imageRepository.GetAsync(id);

        public async Task DeleteAsync(Guid id) =>
             await _imageRepository.DeleteAsync(id);

        public async Task UpdateAsync(Guid id, Image item) =>
            await _imageRepository.UpdateAsync(id, item);

        public async Task CreateAsync(Image item) =>
            await _imageRepository.CreateAsync(item);
    }
}