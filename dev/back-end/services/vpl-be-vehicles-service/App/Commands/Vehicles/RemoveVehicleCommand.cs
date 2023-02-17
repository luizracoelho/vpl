using AutoMapper;

using MediatR;

using VehiclesService.App.Commands.Vehicles;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels;

namespace VehiclesService.App.Commands.Vehicles
{
    public class RemoveVehicleCommand : IRequest<RemoveResultVm>
    {
        public long Id { get; set; }

        public class RemoveVehicleCommandHandler : IRequestHandler<RemoveVehicleCommand, RemoveResultVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public RemoveVehicleCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<RemoveResultVm> Handle(RemoveVehicleCommand request, CancellationToken cancellationToken)
            {
                try
                {
                    var vehicle = await _uow.Vehicles.FindAsync(request.Id);

                    if (vehicle == null)
                        throw new Exception("Veiculo não encontrada.");

                    _uow.Vehicles.Remove(vehicle);

                    await _uow.Commit();

                    return new RemoveResultVm
                    {
                        Success = true
                    };
                }
                catch (Exception ex)
                {
                    return new RemoveResultVm
                    {
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }
    }
}
