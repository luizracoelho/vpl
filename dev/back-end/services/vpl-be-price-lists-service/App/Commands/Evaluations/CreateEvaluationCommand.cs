using AutoMapper;
using MediatR;
using PriceListsService.Domain.ViewModels.Evaluations;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Models;
using MassTransit;
using VplNotifications.Messages.Evaluations;

namespace PriceListsService.App.Commands.Evaluations
{
    public class CreateEvaluationCommand : IRequest<EvaluationVm>
    {
        public long ReferenceYearId { get; set; }
        public int Year { get; set; }
        public decimal Value { get; set; }
        public long VehicleId { get; set; }

        public class CreateEvaluationCommandHandler : IRequestHandler<CreateEvaluationCommand, EvaluationVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            private readonly IBus _bus;

            public CreateEvaluationCommandHandler(IUnitOfWork uow, IMapper mapper, IBus bus)
            {
                _uow = uow;
                _mapper = mapper;
                _bus = bus;
            }

            public async Task<EvaluationVm> Handle(CreateEvaluationCommand request, CancellationToken cancellationToken)
            {
                var evaluation = new Evaluation(request.ReferenceYearId, request.Year, request.Value, request.VehicleId);

                if (!evaluation.Validate())
                    throw new Exception("Avaliação inválida.");

                await _uow.Evaluations.AddAsync(evaluation);

                await _uow.Commit();

                await _bus.Publish(new EvaluationCreatedMessage
                {
                    Message = $"Avaliação do veículo {evaluation.VehicleId}, para o ano {evaluation.Year} no valor de {evaluation.Value:N2} foi inserida."
                }, cancellationToken);

                return _mapper.Map<EvaluationVm>(evaluation);
            }
        }
    }
}