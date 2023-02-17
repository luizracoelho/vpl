using PriceListsService.Domain.Enums;

namespace PriceListsService.Domain.ViewModels.ReferenceYears
{
    public class CreateReferenceYearVm
    {
        [Required]
        public int Year { get; set; }

        [Required]
        public PriceReference PriceReference { get; set; }
    }
}
