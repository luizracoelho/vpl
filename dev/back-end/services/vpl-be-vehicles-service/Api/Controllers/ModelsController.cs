using AutoMapper;

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using VehiclesService.App.Commands.Models;
using VehiclesService.App.Queries.Models;
using VehiclesService.Domain.ViewModels;
using VehiclesService.Domain.ViewModels.Models;

namespace VehiclesService.Api.Controllers
{
    /// <summary>
    /// Rotas responsáveis pelo CRUD de Marcas
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ModelsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public ModelsController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        /// <summary>
        /// Ação responsável por listar todas as modelos cadastradas
        /// </summary>
        /// <returns>Lista de modelos cadastradas</returns>
        [HttpGet]
        public async Task<IList<ModelVm>?> List()
        {
            return await _mediator.Send(new ListModelQuery());
        }

        /// <summary>
        /// Ação responsável por listar os modelos cadastrados por uma marca especifica
        /// </summary>
        /// <param name="brandId">Id da marca</param>
        /// <returns>Lista de modelos cadastrados por marca</returns>
        [HttpGet("brand/{brandId}")]
        public async Task<IList<ModelVm>?> ListByBrand(long brandId)
        {
            return await _mediator.Send(new ListModelByBrandIdQuery
            {
                BrandId = brandId
            });
        }

        /// <summary>
        /// Ação responsável por encontrar uma modelos a partir de um Id
        /// </summary>
        /// <param name="id">Id da modelos a ser encontrada</param>
        /// <returns>Marca encontrada</returns>
        [HttpGet("{id}")]
        public async Task<ModelVm?> Find(long id)
        {
            return await _mediator.Send(new FindModelByIdQuery
            {
                Id = id
            });
        }

        /// <summary>
        /// Método responsável pela criação de uma nova modelos
        /// </summary>
        /// <param name="brand">Marca a ser inserida</param>
        /// <returns>Marca inserida</returns>
        [HttpPost]
        [Authorize]
        public async Task<ModelVm> Create([FromBody] CreateModelVm brand)
        {
            var command = _mapper.Map<CreateModelCommand>(brand);

            return await _mediator.Send(command);
        }

        /// <summary>
        /// Método responsável pela edição de uma modelos
        /// </summary>
        /// <param name="id">Id da modelos a ser editada</param>
        /// <param name="brand">Marca a ser editada</param>
        /// <returns>Marca editada</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestResultVm))]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound, "text/plain")]
        [Authorize]
        public async Task<ModelVm> Update(long id, [FromBody] CreateModelVm brand)
        {
            var command = _mapper.Map<UpdateModelCommand>(brand);
            command.Id = id;

            return await _mediator.Send(command);
        }

        /// <summary>
        /// Método responsável por finalizar a produção de um modelo
        /// </summary>
        /// <param name="id">Id da modelos a ser editada</param>
        /// <param name="brand">Marca a ser editada</param>
        /// <returns>Marca editada</returns>
        [HttpPatch("{id}/endProduction")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestResultVm))]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound, "text/plain")]
        [Authorize]
        public async Task<bool> EndProduction(long id, [FromQuery] DateTime productionEnd)
        {
            return await _mediator.Send(new EndModelProductionCommand
            {
                Id = id,
                ProductionEnd = productionEnd
            });
        }

        /// <summary>
        /// Método responsável pela remoção de uma modelos
        /// </summary>
        /// <param name="id">Id da modelos a ser removida</param>
        /// <returns>Resultado de remoção</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<RemoveResultVm> Remove(long id)
        {
            return await _mediator.Send(new RemoveModelCommand
            {
                Id = id
            });
        }
    }
}
