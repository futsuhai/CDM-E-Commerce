using AutoMapper;
using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Frontend;

namespace e_commerce_backend.Mappers
{
    public class AppMappingProfile : Profile
    {
        public AppMappingProfile() {
            CreateMap<ProductModel, Product>()
                .ReverseMap();
            CreateMap<ArticleModel, Article>()
                .ReverseMap();
        }
    }
}