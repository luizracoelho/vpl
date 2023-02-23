using AutoMapper;

using MediatR;

using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels.Models;

namespace VehiclesService.App.Queries.Models
{
    public class ListModelQuery : IRequest<IList<ModelVm>>
    {
        public class ListModelsQueryHandler : IRequestHandler<ListModelQuery, IList<ModelVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public ListModelsQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<ModelVm>> Handle(ListModelQuery request, CancellationToken cancellationToken)
            {
                var models = await _uow.Models.ListAsync();

                return _mapper.Map<IList<ModelVm>>(models);
            }
        }
    }
}
