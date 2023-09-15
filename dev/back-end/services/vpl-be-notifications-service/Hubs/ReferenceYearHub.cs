using Microsoft.AspNetCore.SignalR;

namespace NotificationsService.Hubs
{
    public class ReferenceYearHub : Hub
    {
        public ReferenceYearHub()
        {
        }

        public async Task ReferenceYearCreated(string message)
        {
            await Clients.All.SendAsync("ReferenceYearCreated", message);
        }

        public async Task ReferenceYearUpdated(string message)
        {
            await Clients.All.SendAsync("ReferenceYearUpdated", message);
        }
    }
}

