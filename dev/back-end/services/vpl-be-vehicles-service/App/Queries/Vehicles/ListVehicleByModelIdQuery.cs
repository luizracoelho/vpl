using AutoMapper;
using MediatR;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.App.Queries.Vehicles
{
    public class ListVehicleByModelIdQuery : IRequest<IList<VehicleVm>>
    {
        public long ModelId { get; set; }

        public class ListVehicleByModelIdQueryHandler : IRequestHandler<ListVehicleByModelIdQuery, IList<VehicleVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;

            public ListVehicleByModelIdQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<VehicleVm>> Handle(ListVehicleByModelIdQuery request, CancellationToken cancellationToken)
            {
                return _mapper.Map<IList<VehicleVm>>(await _uow.Vehicles.ListByModelAsync(request.ModelId));
            }
        }
    }
}
