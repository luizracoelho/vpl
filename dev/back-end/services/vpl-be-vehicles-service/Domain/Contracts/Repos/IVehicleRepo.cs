using VehiclesService.Domain.Models;

namespace VehiclesService.Domain.Contracts.Repos
{
    public interface IVehicleRepo : IBaseRepo<Vehicle>
    {
        Task<IList<Vehicle>> ListByModelAsync(long modelId);
        Task<IList<Vehicle>> ListByBrandAsync(long brandId);
        Task<IList<Vehicle>> SearchAsync(string searchTerms);
        Task<IList<Vehicle>> ListByIdsAsync(IList<long> ids);
    }
}
