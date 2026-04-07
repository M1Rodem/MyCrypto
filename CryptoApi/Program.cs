using CryptoApi.Services;
using CryptoApi.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5001");

builder.Services.AddControllers();

builder.Services.AddScoped<CustomCryptoService>();
builder.Services.AddScoped<ChaCha20Service>();
builder.Services.AddScoped<ICryptoService, CryptoService>();

// CORS для публичного IP фронта
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://185.250.46.70:3001")
            .AllowCredentials() 
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();