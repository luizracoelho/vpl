//using MassTransit;
using NotificationsService.Hubs;
using VplNotifications;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("AllowCors", builder =>
{
    builder.SetIsOriginAllowed(_ => true)
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials();
}));

builder.Services.AddBus(builder.Configuration, typeof(Program).Assembly);

builder.Services.AddControllers();
builder.Services.AddSignalR();

//builder.Services.AddMassTransit(x =>
//{
//    x.AddConsumers(Assembly.GetAssembly(typeof(Program)));

//    x.UsingRabbitMq((context, cfg) =>
//    {
//        cfg.Host(builder.Configuration["RABBIT_MQ:HOST_NAME"], builder.Configuration["RABBIT_MQ:VIRTUAL_HOST"], h =>
//        {
//            h.Username(builder.Configuration["RABBIT_MQ:USER_NAME"]);
//            h.Password(builder.Configuration["RABBIT_MQ:PASSWORD"]);
//        });

//        cfg.ConfigureEndpoints(context);
//        cfg.UseMessageRetry(r => r.Intervals(500, 1000));

//        // Configure messages
//        //// Bank Movement
//        //cfg.Message<CreateBankMovementMessage>(e => e.SetEntityName("CreateBankMovement")); // Exchange
//        //cfg.Publish<CreateBankMovementMessage>(e => e.ExchangeType = "direct"); // Exchange Type
//        //cfg.Send<CreateBankMovementMessage>(e => { e.UseRoutingKeyFormatter(context => context.Message.TenantGroupId.ToString()); }); // Routing Key

//        //// Pre Admission
//        //cfg.Message<CreatePreAdmissionMessage>(e => e.SetEntityName("CreatePreAdmission")); // Exchange
//        //cfg.Publish<CreatePreAdmissionMessage>(e => e.ExchangeType = "direct"); // Exchange Type
//        //cfg.Send<CreatePreAdmissionMessage>(e => { e.UseRoutingKeyFormatter(context => context.Message.TenantGroupId.ToString()); }); // Routing Key
//    });
//});

var app = builder.Build();

app.UseCors("AllowCors");

app.UseAuthorization();

app.MapControllers();

app.MapHub<BrandHub>("/hubs/brands");
app.MapHub<ModelHub>("/hubs/models");
app.MapHub<VehicleHub>("/hubs/vehicles");
app.MapHub<ReferenceYearHub>("/hubs/referenceYears");
app.MapHub<EvaluationHub>("/hubs/evaluations");

app.Run();