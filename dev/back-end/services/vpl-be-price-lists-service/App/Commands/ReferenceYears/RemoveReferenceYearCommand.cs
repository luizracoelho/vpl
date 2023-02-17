using AutoMapper;
using MediatR;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.ViewModels;

namespace PriceListsService.App.Commands.ReferenceYears
{
    public class RemoveReferenceYearCommand : IRequest<RemoveResultVm>
    {
        public long Id { get; set; }

        public class RemoveReferenceYearCommandHandler : IRequestHandler<RemoveReferenceYearCommand, RemoveResultVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public RemoveReferenceYearCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<RemoveResultVm> Handle(RemoveReferenceYearCommand request, CancellationToken cancellationToken)
            {
                try
                {
                    var referenceYear = await _uow.ReferenceYears.FindAsync(request.Id);

                    if (referenceYear == null)
                        throw new Exception("Ano de referência não encontrado.");

                    _uow.ReferenceYears.Remove(referenceYear);

                    await _uow.Commit();

                    return new RemoveResultVm
                    {
                        Success = true
                    };
                }
                catch (Exception ex)
                {
                    return new RemoveResultVm
                    {
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }
    }
}
