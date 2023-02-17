using PriceListsService.Domain.Models;
using PriceListsService.Data.Context;
using PriceListsService.Domain.Contracts.Repos;

namespace PriceListsService.Data.Repos
{
    public class EvaluationRepo : BaseRepo<Evaluation>, IEvaluationRepo
    {
        public EvaluationRepo(PriceListsContext context) : base(context) { }
    }
}
