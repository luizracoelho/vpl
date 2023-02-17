using AutoMapper;
using MediatR;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.ViewModels;

namespace PriceListsService.App.Commands.Evaluations
{
    public class RemoveEvaluationCommand : IRequest<RemoveResultVm>
    {
        public long Id { get; set; }

        public class RemoveEvaluationCommandHandler : IRequestHandler<RemoveEvaluationCommand, RemoveResultVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public RemoveEvaluationCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<RemoveResultVm> Handle(RemoveEvaluationCommand request, CancellationToken cancellationToken)
            {
                try
                {
                    var ealuation = await _uow.Evaluations.FindAsync(request.Id);

                    if (ealuation == null)
                        throw new Exception("Avaliação não encontrada.");

                    _uow.Evaluations.Remove(ealuation);

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
