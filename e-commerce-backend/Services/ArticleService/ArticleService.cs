using e_commerce_backend.Models.Backend;
using e_commerce_backend.Repository.ProductRepository;

namespace e_commerce_backend.Services.ArticleService
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;

        public ArticleService(
            IArticleRepository articleRepository
        )
        {
            _articleRepository = articleRepository;
        }
        public async Task<IList<Article>> GetAllAsync() =>
            await _articleRepository.GetAllAsync();

        public async Task<Article> GetAsync(Guid id) =>
            await _articleRepository.GetAsync(id);

        public async Task DeleteAsync(Guid id) =>
             await _articleRepository.DeleteAsync(id);

        public async Task UpdateAsync(Guid id, Article item) =>
            await _articleRepository.UpdateAsync(id, item);

        public async Task CreateAsync(Article item) =>
            await _articleRepository.CreateAsync(item);
    }
}