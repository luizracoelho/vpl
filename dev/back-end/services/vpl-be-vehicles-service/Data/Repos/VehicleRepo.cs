using Microsoft.EntityFrameworkCore;
using VehiclesService.Data.Context;
using VehiclesService.Domain.Contracts.Repos;
using VehiclesService.Domain.Models;

namespace VehiclesService.Data.Repos
{
    public class VehicleRepo : BaseRepo<Vehicle>, IVehicleRepo
    {
        public VehicleRepo(VehiclesContext context) : base(context) { }

        public async Task<IList<Vehicle>> ListByBrandAsync(long brandId)
        {
            return await dbSet.Include(x => x.Brand)
                              .Include(x => x.Model)
                              .Where(x => x.BrandId == brandId)
                              .OrderBy(x => x.Name)
                              .ToListAsync();
        }

        public async Task<IList<Vehicle>> ListByModelAsync(long modelId)
        {
            return await dbSet.Include(x => x.Brand)
                              .Include(x => x.Model)
                              .Where(x => x.ModelId == modelId)
                              .OrderBy(x => x.Name)
                              .ToListAsync();
        }

        public async override Task<IList<Vehicle>> ListAsync()
        {
            return await dbSet.Include(x => x.Brand)
                              .Include(x => x.Model)
                              .OrderBy(x => x.Name)
                              .ToListAsync();
        }

        public async override Task<Vehicle> FindAsync(long id)
        {
            return await dbSet.Include(x => x.Brand)
                              .Include(x => x.Model)
                              .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IList<Vehicle>> SearchAsync(string searchTerms)
        {
            return await dbSet.Where(x => x.Name.Trim().ToLower().Contains(searchTerms.Trim().ToLower()))
                              .Include(x => x.Brand)
                              .Include(x => x.Model)
                              .OrderBy(x => x.Name)
                              .ToListAsync();
        }

        public async Task<IList<Vehicle>> ListByIdsAsync(IList<long> ids)
        {
            return await dbSet.Include(x => x.Brand)
                              .Include(x => x.Model)
                              .Where(x => ids.Contains(x.Id))
                              .ToListAsync();
        }
    }
}
