using AutoMapper;

using MediatR;

using VehiclesService.App.Commands.Vehicles;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.Enums;
using VehiclesService.Domain.Models;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.App.Commands.Vehicles
{
    public class CreateVehicleCommand : IRequest<VehicleVm>
    {
        public long BrandId { get; set; }
        public long ModelId { get; set; }
        public string Name { get; set; }
        public int ProductionYear { get; set; }
        public int ModelYear { get; set; }
        public VehicleType Type { get; set; }

        public class CreateVehicleCommandHandler : IRequestHandler<CreateVehicleCommand, VehicleVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public CreateVehicleCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<VehicleVm> Handle(CreateVehicleCommand request, CancellationToken cancellationToken)
            {
                var vehicle = new Vehicle(request.BrandId, request.ModelId, request.Name, request.ProductionYear, request.ModelYear, request.Type);

                if (!vehicle.Validate())
                    throw new Exception("Veiculo inválida.");

                await _uow.Vehicles.AddAsync(vehicle);

                await _uow.Commit();

                return _mapper.Map<VehicleVm>(vehicle);
            }
        }
    }
}
