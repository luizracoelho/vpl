using AutoMapper;
using MediatR;
using PriceListsService.Domain.ViewModels.ReferenceYears;
using PriceListsService.Domain.Contracts;


namespace PriceListsService.App.Queries.ReferenceYears
{
    /// <summary>
    /// Responsável por encontrar um ano de referência a partir de um Id
    /// </summary>
    public class FindReferenceYearByIdQuery : IRequest<ReferenceYearVm>
    {
        public long Id { get; set; }

        public class FindReferenceYearByIdQueryHandler : IRequestHandler<FindReferenceYearByIdQuery, ReferenceYearVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public FindReferenceYearByIdQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<ReferenceYearVm> Handle(FindReferenceYearByIdQuery request, CancellationToken cancellationToken)
            {
                var brand = await _uow.ReferenceYears.FindAsync(request.Id);

                return _mapper.Map<ReferenceYearVm>(brand);
            }
        }
    }
}
