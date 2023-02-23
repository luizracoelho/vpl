using System.ComponentModel;

namespace PriceListsService.Domain.Enums
{
    public enum PriceReference
    {
        [Description("Fipe")]
        Fipe = 1,
        [Description("Molicar")]
        Molicar = 2,
    }
}
