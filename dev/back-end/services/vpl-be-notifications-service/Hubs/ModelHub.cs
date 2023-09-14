using Microsoft.AspNetCore.SignalR;

namespace NotificationsService.Hubs
{
    public class ModelHub : Hub
    {
        #region Constructors
        public ModelHub() { }

        #endregion

        #region Methods
        public async Task ModelCreated(string message)
        {
            await Clients.All.SendAsync("ModelCreated", message);
        }

        public async Task ModelUpdated(string message)
        {
            await Clients.All.SendAsync("ModelUpdated", message);
        }
        #endregion
    }
}
