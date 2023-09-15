using MassTransit;

using Microsoft.OpenApi.Models;
using System.Dynamic;
using System.Reflection;
using VehiclesService.IoC;

const string ApiName = "VehiclesService";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("AllowCors", builder =>
{
    builder.SetIsOriginAllowed(_ => true)
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials();
}));

// Add services to the container.
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
    config.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = ApiName,
        Version = "v1",
        Description = $"API de Integra��o {ApiName}",
        Contact = new OpenApiContact
        {
            Name = "VupTech",
            Email = "contato@vuptech.com.br",
            Url = new Uri("https://vuptech.com.br")
        },
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";

    //windows => bin\Debug\net7.0\VehiclesService.xml
    //osx | linux => bin/Debug/net7.0/VehiclesService.xml
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    
    config.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

    config.UseInlineDefinitionsForEnums();

    config.CustomSchemaIds(CustomSchemaIdStrategy);
});

builder.Services.AddMassTransit(x =>
{
    x.AddConsumers(Assembly.GetAssembly(typeof(Program)));

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RABBIT_MQ:HOST_NAME"], builder.Configuration["RABBIT_MQ:VIRTUAL_HOST"], h =>
        {
            h.Username(builder.Configuration["RABBIT_MQ:USER_NAME"]);
            h.Password(builder.Configuration["RABBIT_MQ:PASSWORD"]);
        });

        cfg.ConfigureEndpoints(context);
        cfg.UseMessageRetry(r => r.Intervals(500, 1000));

        // Configure messages
        //// Bank Movement
        //cfg.Message<CreateBankMovementMessage>(e => e.SetEntityName("CreateBankMovement")); // Exchange
        //cfg.Publish<CreateBankMovementMessage>(e => e.ExchangeType = "direct"); // Exchange Type
        //cfg.Send<CreateBankMovementMessage>(e => { e.UseRoutingKeyFormatter(context => context.Message.TenantGroupId.ToString()); }); // Routing Key

        //// Pre Admission
        //cfg.Message<CreatePreAdmissionMessage>(e => e.SetEntityName("CreatePreAdmission")); // Exchange
        //cfg.Publish<CreatePreAdmissionMessage>(e => e.ExchangeType = "direct"); // Exchange Type
        //cfg.Send<CreatePreAdmissionMessage>(e => { e.UseRoutingKeyFormatter(context => context.Message.TenantGroupId.ToString()); }); // Routing Key
    });
});

var app = builder.Build();

app.UseCors("AllowCors");

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseReDoc(c =>
{
    c.DocumentTitle = $"{ApiName} v1";
    c.SpecUrl = "/swagger/v1/swagger.json";
    c.RoutePrefix = string.Empty;
    c.ConfigObject.AdditionalItems.Add("theme", GetRedocTheme());
});

app.UseAuthentication();

app.UseAuthorization();

app.UseInfrastructure();

app.MapControllers();

app.Run();

static string CustomSchemaIdStrategy(Type currentClass)
{
    string returnedValue = currentClass.Name;

    if (returnedValue.EndsWith("Vm"))
        returnedValue = returnedValue.Replace("Vm", string.Empty);

    return returnedValue;
}

static dynamic GetRedocTheme()
{
    dynamic theme = new ExpandoObject();
    theme.colors = new ExpandoObject();
    theme.colors.primary = new ExpandoObject();
    theme.colors.primary.main = "#ec660c";
    return theme;
}