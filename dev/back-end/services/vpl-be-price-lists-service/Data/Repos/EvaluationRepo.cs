using PriceListsService.Domain.Models;
using PriceListsService.Data.Context;
using PriceListsService.Domain.Contracts.Repos;
using Microsoft.EntityFrameworkCore;

namespace PriceListsService.Data.Repos
{
    public class EvaluationRepo : BaseRepo<Evaluation>, IEvaluationRepo
    {
        public EvaluationRepo(PriceListsContext context) : base(context) { }

        public async override Task<IList<Evaluation>> ListAsync()
        {
            return await dbSet.Include(x => x.ReferenceYear)
                               .OrderBy(x => x.Year)
                               .ToListAsync();
        }

        public async Task<IList<Evaluation>> ListByVehicleAsync(long vehicleId)
        {
            var evaluations = await dbSet.Where(x => x.VehicleId == vehicleId)
                               .Include(x => x.ReferenceYear)
                               .OrderBy(x => x.Year)
                               .ToListAsync();

            return evaluations;
        }
    }
}
