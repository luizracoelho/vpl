using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using MediatR;
using PriceListsService.App.Commands.ReferenceYears;
using PriceListsService.App.Queries.Evaluations;
using PriceListsService.App.Queries.ReferenceYears;
using PriceListsService.Domain.ViewModels;
using PriceListsService.Domain.ViewModels.ReferenceYears;

namespace PriceListsService.Api.Controllers
{
    /// <summary>
    /// Rotas responsáveis pelo CRUD do ano de referência
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ReferenceYearsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public ReferenceYearsController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        /// <summary>
        /// Ação responsável por listar todos os ano de referência cadastrados
        /// </summary>
        /// <returns>Lista de ano de referência cadastradas</returns>
        [HttpGet]
        public async Task<IList<ReferenceYearVm>?> List()
        {
            return await _mediator.Send(new ListReferenceYearsQuery());
        }

        /// <summary>
        /// Ação responsável por encontrar um ano de referência a partir de um Id
        /// </summary>
        /// <param name="id">Id da ano de referência a ser encontrada</param>
        /// <returns>ano de referência encontrado</returns>
        [HttpGet("{id}")]
        public async Task<ReferenceYearVm?> Find(long id)
        {
            return await _mediator.Send(new FindReferenceYearByIdQuery
            {
                Id = id
            });
        }

        /// <summary>
        /// Método responsável pela criação de um ano de referência
        /// </summary>
        /// <param name="referenceYear">ano de referência a ser inserida</param>
        /// <returns>ano de referência inserida</returns>
        [HttpPost]
        public async Task<ReferenceYearVm> Create([FromBody] CreateReferenceYearVm referenceYear)
        {
            var command = _mapper.Map<CreateReferenceYearCommand>(referenceYear);

            return await _mediator.Send(command);
        }

        /// <summary>
        /// Método responsável pela edição de um ano de referência
        /// </summary>
        /// <param name="id">Id da ano de referência a ser editada</param>
        /// <param name="referenceYear">ano de referência a ser editada</param>
        /// <returns>ano de referência editada</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestResultVm))]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound, "text/plain")]
        public async Task<ReferenceYearVm> Update(long id, [FromBody] CreateReferenceYearVm referenceYear)
        {
            var command = _mapper.Map<UpdateReferenceYearCommand>(referenceYear);
            command.Id = id;

            return await _mediator.Send(command);
        }

        /// <summary>
        /// Método responsável pela remoção de um ano de referência
        /// </summary>
        /// <param name="id">Id do ano de referência a ser removida</param>
        /// <returns>Resultado de remoção</returns>
        [HttpDelete("{id}")]
        public async Task<RemoveResultVm> Remove(long id)
        {
            return await _mediator.Send(new RemoveReferenceYearCommand
            {
                Id = id
            });
        }
    }
}