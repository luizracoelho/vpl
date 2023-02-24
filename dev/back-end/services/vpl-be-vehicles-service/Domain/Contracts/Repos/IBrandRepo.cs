using VehiclesService.Domain.Models;

namespace VehiclesService.Domain.Contracts.Repos
{
    public interface IBrandRepo : IBaseRepo<Brand>
    {
        Task<IList<Brand>> SearchAsync(string searchTerms);
    }
}
