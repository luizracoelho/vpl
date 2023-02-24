using VehiclesService.Domain.ViewModels.Brands;
using VehiclesService.Domain.ViewModels.Models;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.Domain.ViewModels.Searchs
{
    public class GlobalSearchVm
    {
        public IList<BrandVm>? Brands { get; set; }
        public IList<ModelVm>? Models { get; set; }
        public IList<VehicleVm>? Vehicles { get; set; }

        public GlobalSearchVm(
            IList<BrandVm>? brands = null,
            IList<ModelVm>? models = null,
            IList<VehicleVm>? vehicles = null
        )
        {
            Brands = brands;
            Models = models;
            Vehicles = vehicles;
        }
    }
}

