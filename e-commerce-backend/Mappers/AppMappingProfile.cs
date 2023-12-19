using AutoMapper;
using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Frontend;
using e_commerce_backend.Utils.ImageUtils;

namespace e_commerce_backend.Mappers
{
    public class AppMappingProfile : Profile
    {
        public AppMappingProfile()
        {

            CreateMap<ProductModel, Product>()
                .ForMember(dest => dest.ImageBytes, opt => opt.MapFrom(src => ImageUtils.ConvertBase64ToBytes(src.Base64Image)))
                .ReverseMap()
                .ForMember(dest => dest.Base64Image, opt => opt.MapFrom(src => ImageUtils.ConvertBytesToBase64(src.ImageBytes)))
                .ForMember(dest => dest.ProductTag, opt => opt.MapFrom(src => src.ProductTag.ToString()));

            CreateMap<ArticleModel, Article>()
                .ForMember(dest => dest.ImageBytes, opt => opt.MapFrom(src => ImageUtils.ConvertBase64ToBytes(src.Base64Image)))
                .ReverseMap()
                .ForMember(dest => dest.Base64Image, opt => opt.MapFrom(src => ImageUtils.ConvertBytesToBase64(src.ImageBytes)));
            CreateMap<AccountModel, Account>()
                .ForMember(dest => dest.Salt, opt => opt.Ignore())
                .ForMember(dest => dest.HashPassword, opt => opt.Ignore())
                .ReverseMap();
        }
    }
}