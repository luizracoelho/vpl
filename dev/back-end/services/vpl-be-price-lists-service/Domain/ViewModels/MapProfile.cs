using PriceListsService.Domain.Models;
using PriceListsService.Domain.ViewModels.Evaluations;
using PriceListsService.Domain.ViewModels.ReferenceYears;

namespace PriceListsService.Domain.ViewModels
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            #region Evaluation
            CreateMap<Evaluation, EvaluationVm>().ReverseMap();
            CreateMap<CreateEvaluationVm, CreateEvaluationCommand>();
            CreateMap<CreateEvaluationVm, UpdateEvaluationCommand>();
            #endregion

            #region ReferenceYear
            CreateMap<ReferenceYear, ReferenceYearVm>().ReverseMap();
            CreateMap<CreateReferenceYearVm, CreateReferenceYearCommand>();
            CreateMap<CreateReferenceYearVm, UpdateReferenceYearCommand>();
            #endregion

        }
    }
}
