using Backend.Business.Services;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Veritaban� ba�lant�s�n� yap�land�r
builder.Services.AddDbContext<SahibindenContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Servisleri ekle
builder.Services.AddScoped<CarService>();
builder.Services.AddScoped<HomeService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<MenuService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // JSON serile�tirme se�eneklerini ayarlama
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        options.JsonSerializerOptions.WriteIndented = true; // JSON'un okunabilir olmas�n� sa�lamak i�in
        options.JsonSerializerOptions.MaxDepth = 64; // �htiya� duydu�unuz derinli�e g�re ayarlay�n
    });

// CORS politikalar�n� tan�mla
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Swagger/OpenAPI'yi yap�land�r
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// HTTP istek boru hatt�n� yap�land�r
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS'u kullan
app.UseCors();

app.UseAuthorization();

// Controller'lar� ekle
app.MapControllers();

app.Run();
