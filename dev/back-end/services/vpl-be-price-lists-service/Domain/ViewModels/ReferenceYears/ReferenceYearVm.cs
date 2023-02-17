using PriceListsService.Domain.Enums;

namespace PriceListsService.Domain.ViewModels.ReferenceYears
{
    public class ReferenceYearVm
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public PriceReference PriceReference { get; set; }
    }
}
