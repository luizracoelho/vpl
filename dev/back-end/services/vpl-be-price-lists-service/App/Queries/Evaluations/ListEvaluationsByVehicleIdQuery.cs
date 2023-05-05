﻿using AutoMapper;

using MediatR;

using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Contracts.Services;
using PriceListsService.Domain.Enums;
using PriceListsService.Domain.ViewModels.Evaluations;

namespace PriceListsService.App.Queries.Evaluations
{
    public class ListEvaluationsByVehicleIdQuery : IRequest<IList<EvaluationVm>>
    {
        public long VehicleId { get; set; }
        public PriceReference PriceReference { get; set; }

        public class ListEvaluationsByVehicleIdQueryHandler : IRequestHandler<ListEvaluationsByVehicleIdQuery, IList<EvaluationVm>>
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

            public async Task<IList<EvaluationVm>> Handle(ListEvaluationsByVehicleIdQuery request, CancellationToken cancellationToken)
            {
                var evaluations = await _uow.Evaluations.ListByVehiclePriceReferenceAsync(request.VehicleId, request.PriceReference);

                var vehiclesIds = evaluations.Select(x => x.VehicleId).Distinct().ToList();

                var vehicles = await _vehicleService.FindByIds(vehiclesIds);

                var result = _mapper.Map<IList<EvaluationVm>>(evaluations);

                foreach (var evaluation in result)
                    evaluation.VehicleName = vehicles?.FirstOrDefault(x => x.Id == request.VehicleId)?.Name ?? "";

                return result;
            }
        }
    }
}
