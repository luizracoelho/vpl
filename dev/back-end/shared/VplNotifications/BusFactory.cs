using System;
using Microsoft.Extensions.DependencyInjection;
using MassTransit;
using System.Reflection;
using Microsoft.Extensions.Configuration;

namespace VplNotifications
{
	public static class BusFactory
	{
		public static void AddBus(this IServiceCollection services, IConfiguration config, Assembly assembly)
		{
            services.AddMassTransit(x =>
            {
                x.AddConsumers(assembly);

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(config["RABBIT_MQ:HOST_NAME"], config["RABBIT_MQ:VIRTUAL_HOST"], h =>
                    {
                        h.Username(config["RABBIT_MQ:USER_NAME"]);
                        h.Password(config["RABBIT_MQ:PASSWORD"]);
                    });

                    cfg.ConfigureEndpoints(context);
                    cfg.UseMessageRetry(r => r.Intervals(500, 1000));
                });
            });
        }
    }
}

