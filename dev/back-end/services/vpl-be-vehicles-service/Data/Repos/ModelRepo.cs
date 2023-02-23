using Microsoft.EntityFrameworkCore;
using VehiclesService.Data.Context;
using VehiclesService.Domain.Contracts.Repos;
using VehiclesService.Domain.Models;

namespace VehiclesService.Data.Repos
{
    public class ModelRepo : BaseRepo<Model>, IModelRepo
    {
        public ModelRepo(VehiclesContext context) : base(context) { }

        public override async Task<IList<Model>> ListAsync()
        {
            return await dbSet.Include(x => x.Brand)
                             .OrderBy(x => x.Name)
                             .ToListAsync();
        }

        public async Task<IList<Model>> ListByBrandAsync(long brandId)
        {
            return await dbSet.Include(x => x.Brand)
                              .Where(model => model.BrandId == brandId)
                              .OrderBy(x => x.Name)
                              .ToListAsync();
        }
    }
}
