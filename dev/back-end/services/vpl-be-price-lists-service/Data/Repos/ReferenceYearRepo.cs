using PriceListsService.Data.Context;
using PriceListsService.Domain.Models;
using PriceListsService.Domain.Contracts.Repos;
using Microsoft.EntityFrameworkCore;

namespace PriceListsService.Data.Repos
{
    public class ReferenceYearRepo : BaseRepo<ReferenceYear>, IReferenceYearRepo
    {
        public ReferenceYearRepo(PriceListsContext context) : base(context) { }

        public override async Task<IList<ReferenceYear>> ListAsync()
        {
            return await dbSet.OrderByDescending(x => x.Year)
                              .ThenBy(x => x.PriceReference)
                              .ToListAsync();
        }
    }
}
