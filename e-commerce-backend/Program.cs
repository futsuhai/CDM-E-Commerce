using e_commerce_backend.Init;
using e_commerce_backend.Mappers;
using e_commerce_backend.Models.Options;
using e_commerce_backend.Repository.AccountRepository;
using e_commerce_backend.Repository.ProductRepository;
using e_commerce_backend.Services.AccountService;
using e_commerce_backend.Services.ArticleService;
using e_commerce_backend.Services.ProductService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//repositories
builder.Services.AddSingleton<IProductRepository, ProductRepository>();
builder.Services.AddSingleton<IArticleRepository, ArticleRepository>();
builder.Services.AddSingleton<IAccountRepository, AccountRepository>();
// consts

// mapper
builder.Services.AddAutoMapper(typeof(AppMappingProfile));
// options
builder.Services.AddSingleton<CryptoOptions>();
builder.Services.AddSingleton<JwtOptions>();
builder.Services.Configure<DatabaseOptions>(
    builder.Configuration.GetSection("DatabaseOptions"));
// services
builder.Services.AddSingleton<IArticleService, ArticleService>();
builder.Services.AddSingleton<IProductService, ProductService>();
builder.Services.AddSingleton<IAccountService, AccountService>();
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

// Init database
DatabaseInitializer.InitializeDatabase();

app.UseAuthorization();

app.MapControllers();

app.Run();
