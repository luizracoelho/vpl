using System.Text;
using System.Text.Json;
using PriceListsService.Domain.Contracts.Services;
using PriceListsService.Domain.IntegrationsModels;

namespace PriceListsService.App.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _config;

        public VehicleService(IHttpClientFactory httpClientFactory, IHttpContextAccessor httpContextAccessor, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _httpContextAccessor = httpContextAccessor;
            _config = config;
        }

        public async Task<IList<Vehicle>?> FindByIds(IList<long> ids)
        {
            using var client = _httpClientFactory.CreateClient();

            var requestUri = $"{_config["SERVICES:VEHICLE"]}/vehicles/listByIds";
            var httpRequest = new HttpRequestMessage(HttpMethod.Post, requestUri);

            var content = new StringContent(JsonSerializer.Serialize(ids), Encoding.UTF8, "application/json");
            httpRequest.Content = content;

            httpRequest.Headers.Add("Authorization", _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString());

            var response = await client.SendAsync(httpRequest);

            if (response.IsSuccessStatusCode)
                return await response.Content.ReadFromJsonAsync<IList<Vehicle>>();

            return null;
        }

        public async Task<Vehicle?> FindVehicleById(long? id)
        {
            using var client = _httpClientFactory.CreateClient();

            var requestUri = $"{_config["SERVICES:VEHICLE"]}/vehicles/{id}";
            var httpRequest = new HttpRequestMessage(HttpMethod.Get, requestUri);

            httpRequest.Headers.Add("Authorization", _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString());

            var response = await client.SendAsync(httpRequest);

            if (response.IsSuccessStatusCode)
                return await response.Content.ReadFromJsonAsync<Vehicle>();

            return null;
        }
    }
}

