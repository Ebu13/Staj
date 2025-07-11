using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Northwind.Data;
using Northwind.Business.Request;
using Northwind.Business.Services;
using Northwind.Models;
using System.Text;
using Newtonsoft.Json;
using Northwind.Api.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Configuration nesnesine eri�im
var configuration = builder.Configuration;

// JWT ayarlar�

var issuer = configuration["Jwt:Issuer"];
var audience = configuration["Jwt:Audience"];

// JWT Authentication
var key = configuration["Jwt:Key"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });



// Kontrolc�ler i�in JSON se�eneklerini ayarla
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
    options.JsonSerializerOptions.MaxDepth = 64; // Derin nesne grafikleri i�in MaxDepth'� art�r
});

// DbContext'i yap�land�r
builder.Services.AddDbContext<NorthwindContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

// Uygulama hizmetlerini kaydet
builder.Services.AddScoped<IGenericService<EmployeeRequestDTO>, EmployeeService>();
builder.Services.AddScoped<IGenericService<CategoryRequestDTO>, CategoryService>();
builder.Services.AddScoped<IGenericService<CustomerRequestDTO>, CustomerService>();
builder.Services.AddScoped<IGenericService<MessageRequestDTO>, MessageService>();
builder.Services.AddScoped<IGenericService<OrderRequestDTO>, OrderService>();
builder.Services.AddScoped<IGenericService<OrderDetailRequestDTO>, OrderDetailService>();
builder.Services.AddScoped<IGenericService<ProductRequestDTO>, ProductService>();
builder.Services.AddScoped<IGenericService<ShipperRequestDTO>, ShipperService>();
builder.Services.AddScoped<IGenericService<SupplierRequestDTO>, SupplierService>();
builder.Services.AddScoped<IGenericService<ProductDetailRequestDTO>, ProductDetailService>();
builder.Services.AddScoped<IGenericService<AdminCategoryRequestDTO>, AdminCategoryService>();
builder.Services.AddScoped<IGenericService<SupplierDetailRequestDTO>, SupplierDetailService>();

// Uygulama hizmetlerini kaydet
builder.Services.AddScoped<MessageDetailService>();
builder.Services.AddScoped<ComprehensiveOrderDetailService>(); // Buraya ekleyin

// UserService'i kaydet
builder.Services.AddScoped<IGenericService<User>, UserService>();

builder.Services.AddScoped<MessageDetailService>();

builder.Services.AddScoped<MessageDetailService, MessageDetailService>();

// UserService'i kaydet
builder.Services.AddScoped<IGenericService<User>, UserService>();

// Oturum y�netimi i�in bellek �nbelle�i ekle
builder.Services.AddDistributedMemoryCache();

// Oturum hizmetlerini ekle
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Oturum zaman a��m s�resi
    options.Cookie.HttpOnly = true; // �erezlerin sadece HTTP �zerinden eri�ilebilir olmas�n� sa�la
    options.Cookie.IsEssential = true; // �erezlerin zorunlu oldu�unu belirt
});

// API dok�mantasyonu i�in Swagger ekle
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Northwind API", Version = "v1" });

    // JWT Bearer Authentication
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "L�tfen **'Bearer {your token}'** format�nda token girin.",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };

    c.AddSecurityDefinition("Bearer", securityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { securityScheme, new string[] { } }
    });
});

// CORS politikas�n� yap�land�r
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// HTTP istek hatt�n� yap�land�r
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Northwind API v1");
    });
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// CORS politikas�n� kullan
app.UseCors();

app.UseSession(); // Oturum middleware'ini ekle
app.UseAuthentication(); // Do�rulama middleware'i
app.UseAuthorization(); // Yetkilendirme middleware'i

app.MapControllers();

app.Run();
