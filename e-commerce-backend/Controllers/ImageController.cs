using AutoMapper;
using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Frontend;
using e_commerce_backend.Services.ImageService;
using e_commerce_backend.Utils.ImageUtils;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce_backend.Controllers
{
    [ApiController]
    [Route("api/image")]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        private readonly ILogger<ImageController> _logger;

        public ImageController(
            ILogger<ImageController> logger,
            IMapper mapper,
            IImageService imageService)
        {
            _logger = logger;
            _mapper = mapper;
            _imageService = imageService;
        }

        [HttpGet("GetImage/{id}")]
        public async Task<ImageModel> GetImage(Guid id)
        {
            var image = await _imageService.GetAsync(id);
            var imageModel = _mapper.Map<ImageModel>(image);
            return imageModel;
        }
    }
}