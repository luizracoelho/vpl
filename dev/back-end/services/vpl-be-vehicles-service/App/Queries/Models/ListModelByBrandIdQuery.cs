using AutoMapper;
using MediatR;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels.Models;

namespace VehiclesService.App.Queries.Models
{
    public class ListModelByBrandIdQuery : IRequest<IList<ModelVm>>
    {
        public long BrandId { get; set; }

        public class ListModelByBrandIdQueryHandler : IRequestHandler<ListModelByBrandIdQuery, IList<ModelVm>>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;

            public ListModelByBrandIdQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<IList<ModelVm>> Handle(ListModelByBrandIdQuery request, CancellationToken cancellationToken)
            {
                return _mapper.Map<IList<ModelVm>>(await _uow.Models.ListByBrandAsync(request.BrandId));
            }
        }
    }
}
