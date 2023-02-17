using AutoMapper;
using MediatR;
using PriceListsService.Domain.ViewModels.Evaluations;
using PriceListsService.Domain.Contracts;

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
            public UpdateEvaluationCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
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

                return _mapper.Map<EvaluationVm>(evaluation);
            }
        }
    }
}