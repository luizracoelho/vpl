using AutoMapper;

using MediatR;

using System.Collections.Generic;

using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels.Models;

namespace VehiclesService.App.Queries.Models
{
    public class ListModelByBrandIdQuery : IRequest<IList<ModelVm>>
    {
        public long BrandId { get; set; }

        public class ListModelByBrandIdQueryHandler : IRequestHandler<ListModelByBrandIdQuery, IList<ModelVm>>
        {
            private readonly IUnitOfWork _unitOfWork;
            private readonly IMapper _mapper;

            public ListModelByBrandIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
            {
                _unitOfWork = unitOfWork;
                _mapper = mapper;
            }

            public async Task<IList<ModelVm>> Handle(ListModelByBrandIdQuery request, CancellationToken cancellationToken)
            {
                var models = await _unitOfWork.Models.ListByBrandAsync(request.BrandId);
                return _mapper.Map<IList<ModelVm>>(models);
            }
        }
    }
}
