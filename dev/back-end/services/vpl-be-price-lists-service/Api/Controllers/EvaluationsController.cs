using Microsoft.AspNetCore.Mvc;

using PriceListsService.App.Commands.Evaluations;
using AutoMapper;
using MediatR;
using PriceListsService.App.Queries.Evaluations;
using PriceListsService.App.Queries.ReferenceYears;
using PriceListsService.Domain.ViewModels;
using PriceListsService.Domain.ViewModels.Evaluations;
using Microsoft.AspNetCore.Authorization;

namespace PriceListsService.Api.Controllers
{
    /// <summary>
    /// Rotas responsáveis pelo CRUD do avaliação
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class EvaluationsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public EvaluationsController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        /// <summary>
        /// Ação responsável por listar todos os avaliação cadastradas
        /// </summary>
        /// <returns>Lista de anos de referência cadastradas</returns>
        [HttpGet]
        public async Task<IList<EvaluationVm>?> List()
        {
            return await _mediator.Send(new ListEvaluationsQuery());
        }

        /// <summary>
        /// Ação responsável por encontrar um avaliação a partir de um Id
        /// </summary>
        /// <param name="id">Id da marca a ser encontrada</param>
        /// <returns>Marca encontrada</returns>
        [HttpGet("{id}")]
        public async Task<EvaluationVm?> Find(long id)
        {
            return await _mediator.Send(new FindEvaluationByIdQuery
            {
                Id = id
            });
        }

        /// <summary>
        /// Método responsável pela criação de um avaliação
        /// </summary>
        /// <param name="evaluation">Marca a ser inserida</param>
        /// <returns>Marca inserida</returns>
        [HttpPost]
        [Authorize]
        public async Task<EvaluationVm> Create([FromBody] CreateEvaluationVm evaluation)
        {
            var command = _mapper.Map<CreateEvaluationCommand>(evaluation);

            return await _mediator.Send(command);
        }

        /// <summary>
        /// Método responsável pela edição de um avaliação
        /// </summary>
        /// <param name="id">Id da avaliação a ser editada</param>
        /// <param name="evaluation">avaliação a ser editada</param>
        /// <returns>Marca editada</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestResultVm))]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound, "text/plain")]
        [Authorize]
        public async Task<EvaluationVm> Update(long id, [FromBody] CreateEvaluationVm evaluation)
        {
            var command = _mapper.Map<UpdateEvaluationCommand>(evaluation);
            command.Id = id;

            return await _mediator.Send(command);
        }

        /// <summary>
        /// Método responsável pela remoção de um avaliação
        /// </summary>
        /// <param name="id">Id do avaliação a ser removida</param>
        /// <returns>Resultado de remoção</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<RemoveResultVm> Remove(long id)
        {
            return await _mediator.Send(new RemoveEvaluationCommand
            {
                Id = id
            });
        }
    }
}