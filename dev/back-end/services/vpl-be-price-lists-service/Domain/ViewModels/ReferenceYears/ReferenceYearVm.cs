using PriceListsService.Domain.Enums;

using System.ComponentModel.DataAnnotations;

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
