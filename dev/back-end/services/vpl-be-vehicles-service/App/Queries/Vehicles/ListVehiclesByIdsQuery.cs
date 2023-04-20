using AutoMapper;

using MediatR;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.App.Queries.Vehicles
{
    public class ListVehiclesByIdsQuery : IRequest<IList<VehicleVm>>
    {
        public IList<long> Ids { get; set; }

        public class ListVehiclesByIdsQueryHandler : IRequestHandler<ListVehiclesByIdsQuery, IList<VehicleVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public ListVehiclesByIdsQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<VehicleVm>> Handle(ListVehiclesByIdsQuery request, CancellationToken cancellationToken)
            {
                var vehicles = await _uow.Vehicles.ListByIdsAsync(request.Ids);

                return _mapper.Map<IList<VehicleVm>>(vehicles);
            }
        }
    }
}
