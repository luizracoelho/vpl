using AutoMapper;
using MediatR;

using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.Contracts.Services;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.App.Queries.Vehicles
{
    public class ListVehicleByReferenceYearQuery : IRequest<IList<VehicleVm>>
    {
        public long PriceReferenceNumber { get; set; }
        public long Year { get; set; }


        public class ListVehicleByReferenceYearQueryHandler : IRequestHandler<ListVehicleByReferenceYearQuery, IList<VehicleVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            private readonly IReferenceYearService _referenceYearService;

            public ListVehicleByReferenceYearQueryHandler(IUnitOfWork uow, IMapper mapper, IReferenceYearService referenceYearService)
            {
                _uow = uow;
                _mapper = mapper;
                _referenceYearService = referenceYearService;
            }

            public async Task<IList<VehicleVm>> Handle(ListVehicleByReferenceYearQuery request, CancellationToken cancellationToken)
            {

                var vehicleIds = await _referenceYearService.GetVehicleIdsByReferenceYear(request.PriceReferenceNumber, request.Year);

                if (vehicleIds == null)
                    return null;

                var result = await _uow.Vehicles.ListByIdsAsync(vehicleIds);

                return _mapper.Map<IList<VehicleVm>>(result);
            }
        }
    }
}
