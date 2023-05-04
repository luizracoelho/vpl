using AutoMapper;
using MediatR;

using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.ViewModels.Evaluations;

namespace VehiclesService.App.Queries.Vehicles
{
    public class ListEvaluationsByVehicleIdQuery : IRequest<IList<EvaluationVm>>
    {
        public long VehicleId { get; set; }

        public class ListEvaluationsByVehicleIdQueryHandler : IRequestHandler<ListEvaluationsByVehicleIdQuery, IList<EvaluationVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;

            public ListEvaluationsByVehicleIdQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<EvaluationVm>> Handle(ListEvaluationsByVehicleIdQuery request, CancellationToken cancellationToken)
            {
                return _mapper.Map<IList<EvaluationVm>>(await _uow.Evaluations.ListByVehicleAsync(request.VehicleId));
            }
        }
    }
}
