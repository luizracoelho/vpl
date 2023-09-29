using System;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationsService.Hubs;
using VplNotifications.Messages.Evaluations;

namespace NotificationsService.App.Consumers.Evaluations
{
    public class EvaluationCreatedConsumer : IConsumer<EvaluationCreatedMessage>
	{
        private readonly IHubContext<EvaluationHub> _hubContext;

        public EvaluationCreatedConsumer(IHubContext<EvaluationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task Consume(ConsumeContext<EvaluationCreatedMessage> context)
        {
            await _hubContext.Clients.All.SendAsync("EvaluationCreated", context.Message.Message);
        }
    }
}

