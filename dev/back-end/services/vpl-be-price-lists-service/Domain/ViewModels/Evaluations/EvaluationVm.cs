namespace PriceListsService.Domain.ViewModels.Evaluations
{
    public class EvaluationVm
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public long ReferenceYearId { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public decimal Value { get; set; }

        [Required]
        public long VehicleId { get; set; }
    }
}
