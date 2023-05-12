using PriceListsService.Domain.Enums;
using PriceListsService.Domain.Models;

namespace PriceListsService.Domain.Contracts.Repos
{
    public interface IEvaluationRepo : IBaseRepo<Evaluation>
    {
        Task<IList<Evaluation>> ListByVehiclePriceReferenceAsync(long vehicleId, PriceReference? priceReference);
        Task<IList<Evaluation>> ListByVehicleAsync(long vehicleId);
    }
}
