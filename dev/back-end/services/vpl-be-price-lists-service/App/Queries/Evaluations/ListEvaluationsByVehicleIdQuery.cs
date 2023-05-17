using AutoMapper;

using MediatR;

using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Contracts.Services;
using PriceListsService.Domain.Enums;
using PriceListsService.Domain.ViewModels.Evaluations;

namespace PriceListsService.App.Queries.Evaluations
{
    public class ListEvaluationsByVehicleIdQuery : IRequest<EvaluationPriceReferenceVm>
    {
        public long VehicleId { get; set; }
        public PriceReference? PriceReference { get; set; }

        public class ListEvaluationsByVehicleIdQueryHandler : IRequestHandler<ListEvaluationsByVehicleIdQuery, EvaluationPriceReferenceVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            private readonly IVehicleService _vehicleService;

            public ListEvaluationsByVehicleIdQueryHandler(IUnitOfWork uow, IMapper mapper, IVehicleService vehicleService)
            {
                _uow = uow;
                _mapper = mapper;
                _vehicleService = vehicleService;
            }

            public async Task<EvaluationPriceReferenceVm> Handle(ListEvaluationsByVehicleIdQuery request, CancellationToken cancellationToken)
            {
                try
                {
                    var evaluations = await _uow.Evaluations.ListByVehiclePriceReferenceAsync(request.VehicleId, request.PriceReference);

                    var listEvaluationsFipe = new List<EvaluationVm>();
                    var listEvaluationsMolicar = new List<EvaluationVm>();

                    var vehicle = await _vehicleService.FindVehicleById(request.VehicleId);
                    if (vehicle == null)
                        return null;

                    var result = _mapper.Map<IList<EvaluationVm>>(evaluations);

                    foreach (var evaluation in result)
                        evaluation.VehicleName = vehicle?.Name ?? "";

                    listEvaluationsFipe = result.Where(x => x.ReferecenYearPriceReference == Domain.Enums.PriceReference.Fipe).ToList();

                    listEvaluationsMolicar = result.Where(x => x.ReferecenYearPriceReference == Domain.Enums.PriceReference.Molicar).ToList();

                    var evaluationsPriceReference = new EvaluationPriceReferenceVm();

                    evaluationsPriceReference.Vehicle = vehicle;

                    if (request.PriceReference == null || request.PriceReference == Domain.Enums.PriceReference.Fipe)
                        evaluationsPriceReference.EvaluationsFipe = listEvaluationsFipe;

                    if (request.PriceReference == null || request.PriceReference == Domain.Enums.PriceReference.Molicar)
                        evaluationsPriceReference.EvaluationsMolicar = listEvaluationsMolicar;

                    return evaluationsPriceReference;
                }
                catch (Exception ex)
                {
                    return null;
                }
                //NULAR PRICE REFERENCE
            }
        }
    }
}
