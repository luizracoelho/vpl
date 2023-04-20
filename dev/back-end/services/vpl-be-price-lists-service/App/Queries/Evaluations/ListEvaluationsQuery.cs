using AutoMapper;
using MediatR;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Contracts.Services;
using PriceListsService.Domain.ViewModels.Evaluations;

namespace PriceListsService.App.Queries.Evaluations
{
    public class ListEvaluationsQuery : IRequest<IList<EvaluationVm>>
    {
        public class ListEvaluationsQueryHandler : IRequestHandler<ListEvaluationsQuery, IList<EvaluationVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            private readonly IVehicleService _vehicleService;

            public ListEvaluationsQueryHandler(IUnitOfWork uow, IMapper mapper, IVehicleService vehicleService)
            {
                _uow = uow;
                _mapper = mapper;
                _vehicleService = vehicleService;
            }

            public async Task<IList<EvaluationVm>> Handle(ListEvaluationsQuery request, CancellationToken cancellationToken)
            {
                var evaluations = await _uow.Evaluations.ListAsync();

                var vehiclesIds = evaluations.Select(x => x.VehicleId).Distinct().ToList();

                var vehicles = await _vehicleService.FindByIds(vehiclesIds);

                var result = _mapper.Map<IList<EvaluationVm>>(evaluations);

                foreach (var evaluation in result)
                    evaluation.VehicleName = vehicles?.FirstOrDefault(x => x.Id == evaluation.VehicleId)?.Name ?? "";

                return result.OrderByDescending(x => x.Year).ThenBy(x => x.VehicleName).ToList();
            }
        }
    }
}
