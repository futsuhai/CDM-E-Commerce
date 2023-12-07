using AutoMapper;
using e_commerce_backend.Models.Backend;
using e_commerce_backend.Services.ArticleService;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce_backend.Controllers
{
    [ApiController]
    [Route("api/articles")]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly ILogger<ArticleController> _logger;
        private readonly IMapper _mapper;

        public ArticleController(
            ILogger<ArticleController> logger,
            IMapper mapper,
            IArticleService articleService)
        {
            _logger = logger;
            _mapper = mapper;
            _articleService = articleService;
        }

        [HttpGet("GetArticles")]
        public async Task<List<ArticleModel>> GetProducts()
        {
            var articles = await _articleService.GetAllAsync();
            var productModels = _mapper.Map<List<ArticleModel>>(articles);
            return productModels;
        }

        [HttpPost("AddArticle")]
        public async Task<IActionResult> AddProduct([FromBody] ArticleModel articleModel)
        {
            var article = _mapper.Map<Article>(articleModel);
            await _articleService.CreateAsync(article);
            return Ok("Статья добавлена");
        }
    }
}