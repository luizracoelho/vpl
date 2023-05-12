using AutoMapper;
using MediatR;

using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Enums;
using PriceListsService.Domain.ViewModels.ReferenceYears;

namespace PriceListsService.App.Queries.ReferenceYears
{
    public class ListVehicleIdsByPriceYearReferenceQuery : IRequest<IList<long>?>
    {
        public PriceReference PriceReference { get; set; }
        public long Year { get; set; }

        public class ListVehicleIdsByPriceYearReferenceQueryHandler : IRequestHandler<ListVehicleIdsByPriceYearReferenceQuery, IList<long>?>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;

            public ListVehicleIdsByPriceYearReferenceQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<long>?> Handle(ListVehicleIdsByPriceYearReferenceQuery request, CancellationToken cancellationToken)
            {
                var referenceYear = await _uow.ReferenceYears.FindByPriceYearReference(request.PriceReference, request.Year);

                return _mapper.Map<IList<long>>(referenceYear.Evaluations.Select(x => x.VehicleId).Distinct());
            }
        }
    }
}
