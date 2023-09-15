using NotificationsService.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("AllowCors", builder =>
{
    builder.SetIsOriginAllowed(_ => true)
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials();
}));

builder.Services.AddControllers();
builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors("AllowCors");

app.UseAuthorization();

app.MapControllers();
app.MapHub<EvaluationHub>("/hubs/evaluations");
app.MapHub<EvaluationHub>("/hubs/brands");
app.MapHub<ReferenceYearHub>("/hubs/referenceYears");
app.MapHub<VehicleHub>("/hubs/vehicles");
app.MapHub<ModelHub>("/hubs/models");

app.Run();