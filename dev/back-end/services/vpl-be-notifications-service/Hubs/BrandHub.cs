using Microsoft.AspNetCore.SignalR;

namespace NotificationsService.Hubs
{
    public class BrandHub : Hub
    {
        public BrandHub()
        {
        }

        public async Task BrandCreated(string message)
        {
            await Clients.All.SendAsync("BrandCreated", message);
        }

        public async Task BrandUpdated(string message)
        {
            await Clients.All.SendAsync("BrandUpdated", message);
        }
    }
}

