using AutoMapper;
using MediatR;
using PriceListsService.Domain.ViewModels.Evaluations;
using PriceListsService.Domain.Contracts;

namespace PriceListsService.App.Queries.ReferenceYears
{
    public class ListEvaluationsQuery : IRequest<IList<EvaluationVm>>
    {
        public class ListEvaluationsQueryHandler : IRequestHandler<ListEvaluationsQuery, IList<EvaluationVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public ListEvaluationsQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<EvaluationVm>> Handle(ListEvaluationsQuery request, CancellationToken cancellationToken)
            {
                var brands = await _uow.Evaluations.ListAsync();

                return _mapper.Map<IList<EvaluationVm>>(brands);
            }
        }
    }
}
