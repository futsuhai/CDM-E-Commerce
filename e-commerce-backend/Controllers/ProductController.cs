using AutoMapper;
using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Frontend;
using e_commerce_backend.Services.ProductService;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce_backend.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILogger<ProductController> _logger;
        private readonly IMapper _mapper;

        public ProductController(
            ILogger<ProductController> logger,
            IMapper mapper,
            IProductService productService)
        {
            _logger = logger;
            _mapper = mapper;
            _productService = productService;
        }

        [HttpGet("GetProducts")]
        public async Task<List<ProductModel>> GetProducts()
        {
            var products = await _productService.GetAllAsync();
            var productModels = _mapper.Map<List<ProductModel>>(products);
            return productModels;
        }

        [HttpGet("GetProduct/{productId}")]
        public async Task<ProductModel> GetProduct(Guid productId)
        {
            var product = await _productService.GetAsync(productId);
            var productModel = _mapper.Map<ProductModel>(product);
            return productModel;
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] ProductModel productModel)
        {
            var product = _mapper.Map<Product>(productModel);
            await _productService.CreateAsync(product);
            return Ok("Продукт добавлен");
        }
    }
}