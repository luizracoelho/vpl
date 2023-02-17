using MediatR;
using VehiclesService.Domain.Contracts;

namespace VehiclesService.App.Commands.Models
{
    public class EndModelProductionCommand : IRequest<bool>
    {
        public long Id { get; set; }
        public DateTime ProductionEnd { get; set; }

        public class EndModelProductionCommandHandler : IRequestHandler<EndModelProductionCommand, bool>
        {
            private readonly IUnitOfWork _uow;
            public EndModelProductionCommandHandler(IUnitOfWork uow) => _uow = uow;

            public async Task<bool> Handle(EndModelProductionCommand request, CancellationToken cancellationToken)
            {
                try
                {
                    var model = await _uow.Models.FindAsync(request.Id);

                    if (model == null)
                        throw new Exception("Modelo não encontrada.");

                    model.EndProduction(request.ProductionEnd);

                    if (!model.Validate())
                        throw new Exception("Modelo inválido.");

                    _uow.Models.Update(model);

                    await _uow.Commit();

                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
    }
}
