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
                .ForMember(dest => dest.ProductMainByteImage, opt => opt.MapFrom(src => ImageUtils.ConvertBase64ToBytes(src.ProductMain64Image)))
                .ReverseMap()
                .ForMember(dest => dest.ProductMain64Image, opt => opt.MapFrom(src => ImageUtils.ConvertBytesToBase64(src.ProductMainByteImage)))
                .ForMember(dest => dest.ProductTag, opt => opt.MapFrom(src => src.ProductTag.ToString()))
                .ForMember(dest => dest.ProductCategory, opt => opt.MapFrom(src => src.ProductCategory.ToString()));

            CreateMap<Rewiev, RewievModel>()
                .ReverseMap();

            CreateMap<ArticleModel, Article>()
                .ForMember(dest => dest.ImageBytes, opt => opt.MapFrom(src => ImageUtils.ConvertBase64ToBytes(src.Base64Image)))
                .ReverseMap()
                .ForMember(dest => dest.Base64Image, opt => opt.MapFrom(src => ImageUtils.ConvertBytesToBase64(src.ImageBytes)));
                
            CreateMap<AccountModel, Account>()
                .ForMember(dest => dest.Salt, opt => opt.Ignore())
                .ForMember(dest => dest.HashPassword, opt => opt.Ignore())
                .ForMember(dest => dest.AccountData, opt => opt.MapFrom(src => src.AccountDataModel))
                .ReverseMap()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()))
                .ForMember(dest => dest.AccountDataModel, opt => opt.MapFrom(src => src.AccountData));

            CreateMap<AccountData, AccountDataModel>()
                .ReverseMap();

            CreateMap<ProductBasket, ProductBasketModel>()
                .ReverseMap();

            CreateMap<OrderModel, Order>()
                .ForMember(dest => dest.OrderStatus, opt => opt.MapFrom(src => Enum.Parse<OrderStatus>(src.OrderStatus)))
                .ReverseMap()
                .ForMember(dest => dest.OrderStatus, opt => opt.MapFrom(src => src.OrderStatus.ToString()));
 
            CreateMap<ImageModel, Image>()
                .ForMember(dest => dest.Img, opt => opt.MapFrom(src => ImageUtils.ConvertBase64ToBytes(src.Img64)))
                .ReverseMap()
                .ForMember(dest => dest.Img64, opt => opt.MapFrom(src => ImageUtils.ConvertBytesToBase64(src.Img)));
        }
    }
}