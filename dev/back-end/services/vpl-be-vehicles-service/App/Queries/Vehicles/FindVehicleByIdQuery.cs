using AutoMapper;

using MediatR;

using VehiclesService.App.Queries.Vehicles;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.App.Queries.Vehicles
{
    public class FindVehicleByIdQuery : IRequest<VehicleVm>
    {
        public long Id { get; set; }

        public class FindVehicleByIdQueryHandler : IRequestHandler<FindVehicleByIdQuery, VehicleVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public FindVehicleByIdQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<VehicleVm> Handle(FindVehicleByIdQuery request, CancellationToken cancellationToken)
            {
                var vehicle = await _uow.Vehicles.FindAsync(request.Id);

                return _mapper.Map<VehicleVm>(vehicle);
            }
        }
    }
}
