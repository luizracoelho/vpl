
using PriceListsService.Domain.IntegrationsModels;

namespace PriceListsService.Domain.Contracts.Services
{
    public interface IVehicleService
    {
        Task<Vehicle?> FindVehicleById(long? id);
        Task<IList<Vehicle>?> FindByIds(IList<long> ids);
    }
}

