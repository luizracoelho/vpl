using System.Text;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using VehiclesService.App.Services;
using VehiclesService.Data;
using VehiclesService.Data.Context;
using VehiclesService.Data.Repos;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.Contracts.Context;
using VehiclesService.Domain.Contracts.Repos;
using VehiclesService.Domain.Contracts.Services;
using VehiclesService.Domain.ViewModels;
using VplNotifications;

namespace VehiclesService.IoC
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
        {
            #region Conexão com MySql
            var host = config["DB:HOST"];
            var port = config["DB:PORT"];
            var user = config["DB:USER"];
            var password = config["DB:PASSWORD"];
            var database = config["DB:DATABASE"];

            var connectionString = $"server={host};port={port};database={database};userid={user};pwd={password}";

            services.AddDbContext<VehiclesContext>(
              options => options.UseMySql(connectionString,
                                           ServerVersion.AutoDetect(connectionString),
                                             x =>
                                             {
                                                 x.MigrationsAssembly(typeof(VehiclesContext).Assembly.FullName);
                                             }).LogTo(Console.WriteLine, LogLevel.Information));
            #endregion

            #region Repository pattern
            services.AddScoped<IDataContext, VehiclesContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            #endregion

            #region Repos
            services.AddScoped<IBrandRepo, BrandRepo>();
            services.AddScoped<IModelRepo, ModelRepo>();
            services.AddScoped<IVehicleRepo, VehicleRepo>();
            #endregion

            #region Mediatr
            services.AddMediatR(AppDomain.CurrentDomain.Load("VehiclesService"));
            #endregion

            #region AutoMapper
            services.AddAutoMapper(typeof(MapProfile));
            #endregion

            #region Auth
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.SaveToken = true;
                        options.TokenValidationParameters = GetValidationParameters();
                    });
            #endregion

            #region IntegrationServices
            services.AddHttpClient();
            services.AddHttpContextAccessor();

            services.AddScoped<IReferenceYearService, ReferenceYearService>();
            #endregion

            #region Bus
            services.AddBus(config, AppDomain.CurrentDomain.Load("VehiclesService"));
            #endregion

            return services;
        }

        public static IApplicationBuilder UseInfrastructure(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var ctx = scope.ServiceProvider.GetRequiredService<VehiclesContext>();

            ctx.Database.Migrate();

            return app;
        }

        private static TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = false,
                RequireExpirationTime = true,

                ValidIssuer = "br.com.vpl",
                ValidAudience = "br.com.vpl",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("V3h!cLe@2os3TesT")),
            };
        }
    }
}
