using AutoMapper;

using MediatR;

using VehiclesService.App.Commands.Models;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.Enums;
using VehiclesService.Domain.ViewModels.Models;

namespace VehiclesService.App.Commands.Models
{
    public class UpdateModelCommand : IRequest<ModelVm>
    {
        public long Id { get; set; }
        public long BrandId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public VehicleType Type { get; set; }
        public DateTime ProductionStart { get; set; }
        public DateTime? ProductionEnd { get; set; }
        public bool ProductionEnded { get; set; }

        public class UpdateModelCommandHandler : IRequestHandler<UpdateModelCommand, ModelVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            public UpdateModelCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<ModelVm> Handle(UpdateModelCommand request, CancellationToken cancellationToken)
            {
                var model = await _uow.Models.FindAsync(request.Id);

                if (model == null)
                    throw new Exception("Modelo não encontrada.");

                model.Update(request.BrandId, request.Name, request.Description, request.Type, request.ProductionStart);

                if (!model.Validate())
                    throw new Exception("Modelo inválida.");

                _uow.Models.Update(model);

                await _uow.Commit();

                return _mapper.Map<ModelVm>(model);
            }
        }
    }
}
