using AutoMapper;

using MediatR;

using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.Enums;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.App.Commands.Vehicles
{
    public class UpdateVehicleCommand : IRequest<VehicleVm>
    {
        public long Id { get; set; }
        public long BrandId { get; set; }
        public long ModelId { get; set; }
        public string Name { get; set; }
        public int ProductionYear { get; set; }
        public int ModelYear { get; set; }
        public VehicleType Type { get; set; }

        public class UpdateVehicleCommandHandler : IRequestHandler<UpdateVehicleCommand, VehicleVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public UpdateVehicleCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<VehicleVm> Handle(UpdateVehicleCommand request, CancellationToken cancellationToken)
            {
                var vehicle = await _uow.Vehicles.FindAsync(request.Id);

                if (vehicle == null)
                    throw new Exception("Veiculo não encontrada.");

                vehicle.Update(request.BrandId, request.ModelId, request.Name, request.ProductionYear, request.ModelYear, request.Type);

                if (!vehicle.Validate())
                    throw new Exception("Veiculo inválida.");

                _uow.Vehicles.Update(vehicle);

                await _uow.Commit();

                return _mapper.Map<VehicleVm>(vehicle);
            }
        }
    }
}
