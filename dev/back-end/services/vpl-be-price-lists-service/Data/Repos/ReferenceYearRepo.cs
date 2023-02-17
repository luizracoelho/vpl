using PriceListsService.Data.Context;
using PriceListsService.Domain.Models;
using PriceListsService.Domain.Contracts.Repos;

namespace PriceListsService.Data.Repos
{
    public class ReferenceYearRepo : BaseRepo<ReferenceYear>, IReferenceYearRepo
    {
        public ReferenceYearRepo(PriceListsContext context) : base(context) { }
    }
}
