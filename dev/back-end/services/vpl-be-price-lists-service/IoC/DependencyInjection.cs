using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using PriceListsService.App.Services;
using PriceListsService.Data;
using PriceListsService.Data.Context;
using PriceListsService.Data.Repos;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Contracts.Context;
using PriceListsService.Domain.Contracts.Repos;
using PriceListsService.Domain.Contracts.Services;
using PriceListsService.Domain.ViewModels;
using System.Text;

namespace PriceListsService.IoC
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

            services.AddDbContext<PriceListsContext>(
              options => options.UseMySql(connectionString,
                                           ServerVersion.AutoDetect(connectionString),
                                             x =>
                                             {
                                                 x.MigrationsAssembly(typeof(PriceListsContext).Assembly.FullName);
                                             }).LogTo(Console.WriteLine, LogLevel.Information));
            #endregion

            #region Repository pattern
            services.AddScoped<IDataContext, PriceListsContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            #endregion

            #region Repos
            services.AddScoped<IEvaluationRepo, EvaluationRepo>();
            services.AddScoped<IReferenceYearRepo, ReferenceYearRepo>();
            #endregion

            #region Mediatr
            services.AddMediatR(AppDomain.CurrentDomain.Load("PriceListsService"));
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

            services.AddScoped<IVehicleService, VehicleService>();


            return services;
        }

        public static IApplicationBuilder UseInfrastructure(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var ctx = scope.ServiceProvider.GetRequiredService<PriceListsContext>();

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
