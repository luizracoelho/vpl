using System.Text.Json;
using System.Text;

using VehiclesService.Domain.Contracts.Services;

namespace VehiclesService.App.Services
{
    public class ReferenceYearService : IReferenceYearService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _config;

        public ReferenceYearService(IHttpClientFactory httpClientFactory, IHttpContextAccessor httpContextAccessor, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _httpContextAccessor = httpContextAccessor;
            _config = config;
        }

        public async Task<IList<long>?> GetVehicleIdsByReferenceYear(long priceReferenceNumber, long year)
        {
            using var client = _httpClientFactory.CreateClient();

            var requestUri = $"{_config["SERVICES:PRICELIST"]}/ReferenceYears/priceReference/vehicles/{priceReferenceNumber}/{year}";
            var httpRequest = new HttpRequestMessage(HttpMethod.Get, requestUri);

            var response = await client.SendAsync(httpRequest);

            if(!response.IsSuccessStatusCode)
                return null;

            return await response.Content.ReadFromJsonAsync<IList<long>>();
        }
    }
}
