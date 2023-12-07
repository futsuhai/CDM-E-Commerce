using e_commerce_backend.Mappers;
using e_commerce_backend.Models.Options;
using e_commerce_backend.Repository.ProductRepository;
using e_commerce_backend.Services.ArticleService;
using e_commerce_backend.Services.ProductService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//repositories
builder.Services.AddSingleton<IProductRepository, ProductRepository>();
builder.Services.AddSingleton<IArticleRepository, ArticleRepository>();
// consts

// mapper
builder.Services.AddAutoMapper(typeof(AppMappingProfile));
// options
builder.Services.Configure<DatabaseOptions>(
    builder.Configuration.GetSection("DatabaseOptions"));
// services
builder.Services.AddSingleton<IArticleService, ArticleService>();
builder.Services.AddSingleton<IProductService, ProductService>();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "http://localhost:4200");
    });
}

app.UseCors(options =>
{
    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
