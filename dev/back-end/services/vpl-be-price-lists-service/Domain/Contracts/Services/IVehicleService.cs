
using PriceListsService.Domain.IntegrationsModels;

namespace PriceListsService.Domain.Contracts.Services
{
    public interface IVehicleService
    {
        Task<Vehicle?> FindVehicleById(long? id);
    }
}

