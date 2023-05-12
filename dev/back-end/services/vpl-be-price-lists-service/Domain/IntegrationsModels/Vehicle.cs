namespace PriceListsService.Domain.IntegrationsModels
{
    public class Vehicle
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
        public int Type { get; set; }
    }
}
