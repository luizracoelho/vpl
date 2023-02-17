using AutoMapper;
using MediatR;
using PriceListsService.Domain.ViewModels.Evaluations;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Models;

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
            public CreateEvaluationCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<EvaluationVm> Handle(CreateEvaluationCommand request, CancellationToken cancellationToken)
            {
                var evaluation = new Evaluation(request.ReferenceYearId, request.Year, request.Value, request.VehicleId);

                if (!evaluation.Validate())
                    throw new Exception("Avaliação inválida.");

                await _uow.Evaluations.AddAsync(evaluation);

                await _uow.Commit();

                return _mapper.Map<EvaluationVm>(evaluation);
            }
        }
    }
}