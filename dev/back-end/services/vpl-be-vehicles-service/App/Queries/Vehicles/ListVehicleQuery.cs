using AutoMapper;

using MediatR;

using VehiclesService.App.Queries.Vehicles;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.App.Queries.Vehicles
{
    public class ListVehicleQuery : IRequest<IList<VehicleVm>>
    {
        public class ListVehiclesQueryHandler : IRequestHandler<ListVehicleQuery, IList<VehicleVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public ListVehiclesQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<VehicleVm>> Handle(ListVehicleQuery request, CancellationToken cancellationToken)
            {
                var vehicles = await _uow.Vehicles.ListAsync();

                return _mapper.Map<IList<VehicleVm>>(vehicles);
            }
        }
    }
}
