using Microsoft.EntityFrameworkCore;
using VehiclesService.Data.Context;
using VehiclesService.Domain.Contracts.Repos;
using VehiclesService.Domain.Models;

namespace VehiclesService.Data.Repos
{
    public class BrandRepo : BaseRepo<Brand>, IBrandRepo
    {
        public BrandRepo(VehiclesContext context) : base(context) { }

        public override async Task<IList<Brand>> ListAsync()
            => await dbSet.OrderBy(x => x.Name).ToListAsync();
    }
}
