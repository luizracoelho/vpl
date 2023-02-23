using AutoMapper;
using MediatR;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.App.Queries.Vehicles
{
    public class ListVehicleByBrandIdQuery : IRequest<IList<VehicleVm>>
    {
        public long BrandId { get; set; }

        public class ListVehicleByBrandIdQueryHandler : IRequestHandler<ListVehicleByBrandIdQuery, IList<VehicleVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;

            public ListVehicleByBrandIdQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<VehicleVm>> Handle(ListVehicleByBrandIdQuery request, CancellationToken cancellationToken)
            {
                return _mapper.Map<IList<VehicleVm>>(await _uow.Vehicles.ListByBrandAsync(request.BrandId));
            }
        }
    }
}
