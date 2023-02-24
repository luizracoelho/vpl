using System;
using AutoMapper;
using MediatR;
using VehiclesService.App.Queries.Brands;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.ViewModels.Brands;
using VehiclesService.Domain.ViewModels.Models;
using VehiclesService.Domain.ViewModels.Searchs;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.App.Queries.Searchs
{
	public class GlobalSearchQuery : IRequest<GlobalSearchVm>
    {
        public string? SearchTerms { get; set; }

        public class GlobalSearchQueryHandler : IRequestHandler<GlobalSearchQuery, GlobalSearchVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;

            public GlobalSearchQueryHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<GlobalSearchVm> Handle(GlobalSearchQuery request, CancellationToken cancellationToken)
            {
                if (string.IsNullOrWhiteSpace(request.SearchTerms))
                    return new GlobalSearchVm();

                var brands = await _uow.Brands.SearchAsync(request.SearchTerms);
                var models = await _uow.Models.SearchAsync(request.SearchTerms);
                var vehicles = await _uow.Vehicles.SearchAsync(request.SearchTerms);

                var brandsVm = brands != null ? _mapper.Map<IList<BrandVm>>(brands) : null;
                var modelsVm = models != null ? _mapper.Map<IList<ModelVm>>(models) : null;
                var vehiclesVm = vehicles != null ? _mapper.Map<IList<VehicleVm>>(vehicles) : null;

                return new GlobalSearchVm(brandsVm, modelsVm, vehiclesVm);
            }
        }
    }
}

