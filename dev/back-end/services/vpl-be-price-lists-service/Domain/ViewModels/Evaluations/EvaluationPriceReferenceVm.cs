using PriceListsService.Domain.Enums;

using VehiclesService.Domain.ViewModels.Vehicles;

namespace PriceListsService.Domain.ViewModels.Evaluations
{
    public class EvaluationPriceReferenceVm
    {
        public VehicleVm Vehicle { get; set; }
        public IList<EvaluationVm> EvaluationsFipe { get; set; }
        public IList<EvaluationVm> EvaluationsMolicar { get; set; }

    }
}
