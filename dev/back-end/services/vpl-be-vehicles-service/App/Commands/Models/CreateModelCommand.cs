using AutoMapper;

using MediatR;

using VehiclesService.App.Commands.Models;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.Enums;
using VehiclesService.Domain.Models;
using VehiclesService.Domain.ViewModels.Models;

namespace VehiclesService.App.Commands.Models
{
    public class CreateModelCommand : IRequest<ModelVm>
    {
        public long BrandId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public VehicleType Type { get; set; }
        public DateTime ProductionStart { get; set; }
        public DateTime? ProductionEnd { get; set; }
        public bool ProductionEnded { get; set; }

        public class CreateModelCommandHandler : IRequestHandler<CreateModelCommand, ModelVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public CreateModelCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<ModelVm> Handle(CreateModelCommand request, CancellationToken cancellationToken)
            {
                var model = new Model(request.BrandId, request.Name, request.Description, request.Type, request.ProductionStart, request.ProductionEnd, request.ProductionEnded);

                if (!model.Validate())
                    throw new Exception("Modelo inválida.");

                await _uow.Models.AddAsync(model);

                await _uow.Commit();

                return _mapper.Map<ModelVm>(model);
            }
        }
    }
}
