using AutoMapper;

using MediatR;

using VehiclesService.App.Commands.Models;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels;

namespace VehiclesService.App.Commands.Models
{
    public class RemoveModelCommand : IRequest<RemoveResultVm>
    {
        public long Id { get; set; }

        public class RemoveModelCommandHandler : IRequestHandler<RemoveModelCommand, RemoveResultVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public RemoveModelCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<RemoveResultVm> Handle(RemoveModelCommand request, CancellationToken cancellationToken)
            {
                try
                {
                    var model = await _uow.Models.FindAsync(request.Id);

                    if (model == null)
                        throw new Exception("Modelo não encontrada.");

                    _uow.Models.Remove(model);

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
