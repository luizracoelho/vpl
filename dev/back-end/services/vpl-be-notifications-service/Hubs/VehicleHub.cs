using Microsoft.AspNetCore.SignalR;

namespace NotificationsService.Hubs
{
    public class VehicleHub : Hub
    {
        #region Constructors
        public VehicleHub() { }

        #endregion

        #region Methods
        public async Task VehicleCreated(string message)
        {
            await Clients.All.SendAsync("VehicleCreated", message);
        }

        public async Task VehicleUpdated(string message)
        {
            await Clients.All.SendAsync("VehicleUpdated", message);
        }
        #endregion
    }
}
