using AutoMapper;
using MediatR;
using PriceListsService.Domain.ViewModels.ReferenceYears;
using PriceListsService.Domain.Contracts;

namespace PriceListsService.App.Queries.ReferenceYears
{
    public class ListReferenceYearsQuery : IRequest<IList<ReferenceYearVm>>
    {
        public class ListReferenceYearsQueryHandler : IRequestHandler<ListReferenceYearsQuery, IList<ReferenceYearVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public ListReferenceYearsQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<ReferenceYearVm>> Handle(ListReferenceYearsQuery request, CancellationToken cancellationToken)
            {
                var brands = await _uow.ReferenceYears.ListAsync();

                return _mapper.Map<IList<ReferenceYearVm>>(brands.OrderBy(x => x.Year));
            }
        }
    }
}
