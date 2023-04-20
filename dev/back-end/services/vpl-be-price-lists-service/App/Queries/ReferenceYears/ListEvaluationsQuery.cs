using AutoMapper;
using MediatR;
using PriceListsService.Domain.ViewModels.Evaluations;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Contracts.Services;

namespace PriceListsService.App.Queries.ReferenceYears
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

                    var vehicle = await _vehicleService.FindVehicleById(2);


                var brands = await _uow.Evaluations.ListAsync();

                return _mapper.Map<IList<EvaluationVm>>(brands);
            }
        }
    }
}
