using System;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationsService.Hubs;
using VplNotifications.Messages.Evaluations;

namespace NotificationsService.App.Consumers.Evaluations
{
    public class EvaluationUpdatedConsumer : IConsumer<EvaluationUpdatedMessage>
	{
        private readonly IHubContext<EvaluationHub> _hubContext;

        public EvaluationUpdatedConsumer(IHubContext<EvaluationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task Consume(ConsumeContext<EvaluationUpdatedMessage> context)
        {
            await _hubContext.Clients.All.SendAsync("EvaluationUpdated", context.Message.Message);
        }
    }
}

