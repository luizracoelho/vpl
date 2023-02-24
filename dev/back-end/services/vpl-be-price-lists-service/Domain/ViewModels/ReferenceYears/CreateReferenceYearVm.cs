using PriceListsService.Domain.Enums;
using System.ComponentModel.DataAnnotations;

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
