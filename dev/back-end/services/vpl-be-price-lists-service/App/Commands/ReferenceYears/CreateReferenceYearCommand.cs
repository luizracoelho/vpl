using AutoMapper;
using MediatR;
using PriceListsService.Domain.Models;
using PriceListsService.Domain.ViewModels.ReferenceYears;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Enums;

namespace PriceListsService.App.Commands.ReferenceYears
{
    public class CreateReferenceYearCommand : IRequest<ReferenceYearVm>
    {
        public int Year { get; set; }
        public PriceReference PriceReference { get; set; }

        public class CreateReferenceYearCommandHandler : IRequestHandler<CreateReferenceYearCommand, ReferenceYearVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public CreateReferenceYearCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<ReferenceYearVm> Handle(CreateReferenceYearCommand request, CancellationToken cancellationToken)
            {
                var referenceYear = new ReferenceYear(request.Year, request.PriceReference);

                if (!referenceYear.Validate())
                    throw new Exception("Ano de referência inválido.");

                await _uow.ReferenceYears.AddAsync(referenceYear);

                await _uow.Commit();

                return _mapper.Map<ReferenceYearVm>(referenceYear);
            }
        }
    }
}