using AutoMapper;
using MediatR;
using PriceListsService.Domain.ViewModels.Evaluations;
using PriceListsService.Domain.Contracts;
using MassTransit;
using VplNotifications.Messages.Evaluations;

namespace PriceListsService.App.Commands.Evaluations
{
    public class UpdateEvaluationCommand : IRequest<EvaluationVm>
    {
        public long Id { get; set; }
        public long ReferenceYearId { get; set; }
        public int Year { get; set; }
        public decimal Value { get; set; }
        public long VehicleId { get; set; }

        public class UpdateEvaluationCommandHandler : IRequestHandler<UpdateEvaluationCommand, EvaluationVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            private readonly IBus _bus;

            public UpdateEvaluationCommandHandler(IUnitOfWork uow, IMapper mapper, IBus bus)
            {
                _uow = uow;
                _mapper = mapper;
                _bus = bus;
            }

            public async Task<EvaluationVm> Handle(UpdateEvaluationCommand request, CancellationToken cancellationToken)
            {
                var evaluation = await _uow.Evaluations.FindAsync(request.Id);

                if (evaluation == null)
                    throw new Exception("Avaliação não encontrada.");

                evaluation.Update(request.ReferenceYearId, request.Year, request.Value, request.VehicleId);

                if (!evaluation.Validate())
                    throw new Exception("Avaliação inválida.");

                _uow.Evaluations.Update(evaluation);

                await _uow.Commit();

                await _bus.Publish(new EvaluationUpdatedMessage
                {
                    Message = $"Avaliação do veículo {evaluation.VehicleId}, para o ano {evaluation.Year} no valor de ${evaluation.Value:N2} foi alterada."
                }, cancellationToken);

                return _mapper.Map<EvaluationVm>(evaluation);
            }
        }
    }
}