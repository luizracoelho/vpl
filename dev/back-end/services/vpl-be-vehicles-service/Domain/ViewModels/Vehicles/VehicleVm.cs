using VehiclesService.Domain.Enums;

namespace VehiclesService.Domain.ViewModels.Vehicles
{
    public class VehicleVm
    {
        public long Id { get; set; }
        public long BrandId { get; set; }
        public string BrandName { get; set; }
        public string BrandLogo { get; set; }
        public long ModelId { get; set; }
        public string Model { get; set; }
        public string Name { get; set; }
        public int ProductionYear { get; set; }
        public int ModelYear { get; set; }
        public VehicleType Type { get; set; }
    }
}
