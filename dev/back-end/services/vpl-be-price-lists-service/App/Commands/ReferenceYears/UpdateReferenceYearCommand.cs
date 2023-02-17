using AutoMapper;
using MediatR;
using PriceListsService.Domain.ViewModels.ReferenceYears;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Enums;

namespace PriceListsService.App.Commands.ReferenceYears
{
    public class UpdateReferenceYearCommand : IRequest<ReferenceYearVm>
    {
        public long Id { get; set; }
        public int Year { get; set; }
        public PriceReference PriceReference { get; set; }

        public class UpdateReferenceYearCommandHandler : IRequestHandler<UpdateReferenceYearCommand, ReferenceYearVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public UpdateReferenceYearCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<ReferenceYearVm> Handle(UpdateReferenceYearCommand request, CancellationToken cancellationToken)
            {
                var referenceYear = await _uow.ReferenceYears.FindAsync(request.Id);

                if (referenceYear == null)
                    throw new Exception("Ano de referência não encontrado.");

                referenceYear.Update(request.Year, request.PriceReference);

                if (!referenceYear.Validate())
                    throw new Exception("Ano de referência inválido.");

                _uow.ReferenceYears.Update(referenceYear);

                await _uow.Commit();

                return _mapper.Map<ReferenceYearVm>(referenceYear);
            }
        }
    }
}