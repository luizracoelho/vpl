using PriceListsService.Data;
using PriceListsService.Data.Context;
using PriceListsService.Data.Repos;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Contracts.Context;
using PriceListsService.Domain.Contracts.Repos;
using PriceListsService.Domain.ViewModels;

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
            services.AddScoped<IReferenceYearRepo, ModelRepo>();
            #endregion

            #region Mediatr
            services.AddMediatR(AppDomain.CurrentDomain.Load("VehiclesService"));
            #endregion

            #region AutoMapper
            services.AddAutoMapper(typeof(MapProfile));
            #endregion

            return services;
        }

        public static IApplicationBuilder UseInfrastructure(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var ctx = scope.ServiceProvider.GetRequiredService<PriceListsContext>();

            ctx.Database.Migrate();

            return app;
        }
    }
}
