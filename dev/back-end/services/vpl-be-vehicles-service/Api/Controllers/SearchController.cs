using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using VehiclesService.App.Commands.Brands;
using VehiclesService.App.Queries.Brands;
using VehiclesService.App.Queries.Searchs;
using VehiclesService.Domain.ViewModels;
using VehiclesService.Domain.ViewModels.Brands;
using VehiclesService.Domain.ViewModels.Searchs;

namespace VehiclesService.Api.Controllers
{
    /// <summary>
    /// Rota responsável por efetuar pesquisas
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class SearchController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SearchController(IMediator mediator) => _mediator = mediator;

        /// <summary>
        /// Ação responsável por pesquisar as marcas, modelos e veículos por um termo específico
        /// </summary>
        /// <param name="searchTerms">Termo a ser pesquisado</param>
        /// <returns>Lista de marcas cadastradas</returns>
        [HttpGet]
        public async Task<GlobalSearchVm> Search([FromQuery] string? searchTerms)
        {
            return await _mediator.Send(new GlobalSearchQuery { SearchTerms = searchTerms });
        }
    }
}
