using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options => options.AddPolicy("AllowCors", builder =>
{
    builder.SetIsOriginAllowed(_ => true)
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials();
}));

builder.Services.AddOcelot(builder.Configuration);

builder.Host.ConfigureAppConfiguration(config =>
{
#if DEBUG
    config.AddJsonFile("configuration.Development.json");
#else
    config.AddJsonFile("configuration.json");
#endif
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}

app.UseCors("AllowCors");

app.UseAuthorization();

app.MapControllers();

app.UseOcelot().Wait();

app.Run();
