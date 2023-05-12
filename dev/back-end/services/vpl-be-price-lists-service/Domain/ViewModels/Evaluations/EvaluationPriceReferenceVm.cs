
using PriceListsService.Domain.IntegrationsModels;

namespace PriceListsService.Domain.ViewModels.Evaluations
{
    public class EvaluationPriceReferenceVm
    {
        public Vehicle Vehicle { get; set; }
        public IList<EvaluationVm> EvaluationsFipe { get; set; }
        public IList<EvaluationVm> EvaluationsMolicar { get; set; }

    }
}
