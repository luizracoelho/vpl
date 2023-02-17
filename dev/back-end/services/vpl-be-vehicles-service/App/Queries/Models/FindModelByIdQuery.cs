using AutoMapper;

using MediatR;

using VehiclesService.App.Queries.Models;
using VehiclesService.App.Queries.Models;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels.Models;
using VehiclesService.Domain.ViewModels.Models;

namespace VehiclesService.App.Queries.Models
{
    public class FindModelByIdQuery : IRequest<ModelVm>
    {
        public long Id { get; set; }

        public class FindModelByIdQueryHandler : IRequestHandler<FindModelByIdQuery, ModelVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public FindModelByIdQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<ModelVm> Handle(FindModelByIdQuery request, CancellationToken cancellationToken)
            {
                var model = await _uow.Models.FindAsync(request.Id);

                return _mapper.Map<ModelVm>(model);
            }
        }
    }
}
