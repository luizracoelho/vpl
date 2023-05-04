using AutoMapper;

using MediatR;

using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Enums;
using PriceListsService.Domain.ViewModels.ReferenceYears;

namespace PriceListsService.App.Queries.ReferenceYears
{
    public class ListReferenceYearByPriceReferenceQuery : IRequest<IList<ReferenceYearVm>?>
    {
        public PriceReference PriceReference { get; set; }

        public class ListReferenceYearByPriceReferenceQueryHandler : IRequestHandler<ListReferenceYearByPriceReferenceQuery, IList<ReferenceYearVm>?>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;

            public ListReferenceYearByPriceReferenceQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<ReferenceYearVm>?> Handle(ListReferenceYearByPriceReferenceQuery request, CancellationToken cancellationToken)
            {
                var references = await _uow.ReferenceYears.ListByPriceReferenceAsync(request.PriceReference);

                return _mapper.Map<IList<ReferenceYearVm>>(references); 
            }
        }
    }
}
