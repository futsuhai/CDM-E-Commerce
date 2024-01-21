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
                .ForMember(dest => dest.ProductByteImages, opt => opt.MapFrom(src => ImageUtils.ConvertBase64ListToBytesList(src.Product64Images)))
                .ForMember(dest => dest.ProductMainByteImage, opt => opt.MapFrom(src => ImageUtils.ConvertBase64ToBytes(src.ProductMain64Image)))
                .ReverseMap()
                .ForMember(dest => dest.Product64Images, opt => opt.MapFrom(src => ImageUtils.ConvertBytesListToBase64List(src.ProductByteImages)))
                .ForMember(dest => dest.ProductMain64Image, opt => opt.MapFrom(src => ImageUtils.ConvertBytesToBase64(src.ProductMainByteImage)))
                .ForMember(dest => dest.ProductTag, opt => opt.MapFrom(src => src.ProductTag.ToString()))
                .ForMember(dest => dest.ProductCategory, opt => opt.MapFrom(src => src.ProductCategory.ToString()));

            CreateMap<ArticleModel, Article>()
                .ForMember(dest => dest.ImageBytes, opt => opt.MapFrom(src => ImageUtils.ConvertBase64ToBytes(src.Base64Image)))
                .ReverseMap()
                .ForMember(dest => dest.Base64Image, opt => opt.MapFrom(src => ImageUtils.ConvertBytesToBase64(src.ImageBytes)));
                
            CreateMap<AccountModel, Account>()
                .ForMember(dest => dest.Salt, opt => opt.Ignore())
                .ForMember(dest => dest.HashPassword, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()));
                
            CreateMap<ImageModel, Image>()
                .ForMember(dest => dest.Img, opt => opt.MapFrom(src => ImageUtils.ConvertBase64ToBytes(src.Img64)))
                .ReverseMap()
                .ForMember(dest => dest.Img64, opt => opt.MapFrom(src => ImageUtils.ConvertBytesToBase64(src.Img)));
        }
    }
}