using Backend.Business.Repositories.Interfaces;
using Backend.Business.Repositories;
using Backend.Business.Services.Interfaces;
using Backend.Business.Services;
using Backend.Data; // Service'ler için gerekli namespace
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure Entity Framework Core
builder.Services.AddDbContext<IsmekContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add repository and service dependencies
builder.Services.AddScoped<IHaberlerRepository, HaberlerRepository>();
builder.Services.AddScoped<IHaberlerService, HaberlerService>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173") // İzin verilen orijin
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();
app.MapControllers();
app.Run();
