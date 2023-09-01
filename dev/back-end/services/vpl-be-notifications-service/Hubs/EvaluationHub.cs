using Microsoft.AspNetCore.SignalR;

namespace NotificationsService.Hubs
{
	public class EvaluationHub : Hub
	{
		public EvaluationHub()
		{
		}

        public async Task EvaluationCreated(string message)
        {
            await Clients.All.SendAsync("EvaluationCreated", message);
        }

        public async Task EvaluationUpdated(string message)
        {
            await Clients.All.SendAsync("EvaluationUpdated", message);
        }
    }
}

