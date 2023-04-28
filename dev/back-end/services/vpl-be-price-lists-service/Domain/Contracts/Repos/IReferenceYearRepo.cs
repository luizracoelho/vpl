using PriceListsService.Domain.Enums;
using PriceListsService.Domain.Models;

namespace PriceListsService.Domain.Contracts.Repos
{
    public interface IReferenceYearRepo : IBaseRepo<ReferenceYear>
    {
        Task<IList<ReferenceYear>> ListByPriceReferenceAsync(PriceReference priceReference);
    }
}
