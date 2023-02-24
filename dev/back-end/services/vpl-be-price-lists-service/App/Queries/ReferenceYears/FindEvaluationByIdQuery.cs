using AutoMapper;
using MediatR;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.ViewModels.Evaluations;

namespace PriceListsService.App.Queries.Evaluations
{
    public class FindEvaluationByIdQuery : IRequest<EvaluationVm>
    {
        public long Id { get; set; }

        public class FindEvaluationByIdQueryHandler : IRequestHandler<FindEvaluationByIdQuery, EvaluationVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public FindEvaluationByIdQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<EvaluationVm> Handle(FindEvaluationByIdQuery request, CancellationToken cancellationToken)
            {
                var brand = await _uow.Evaluations.FindAsync(request.Id);

                return _mapper.Map<EvaluationVm>(brand);
            }
        }
    }
}
