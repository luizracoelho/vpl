using VehiclesService.Domain.Models;

namespace PriceListsService.Domain.Models
{
    public sealed class Evaluation : BaseDomain
    {
        #region Properties
        public long ReferenceYearId { get; private set; }
        public ReferenceYear ReferenceYear { get; private set; }
        public int Year { get; private set; }
        public decimal Value { get; private set; }
        public long VehicleId { get; private set; }
        #endregion

        #region Constructors
        private Evaluation() { }

        public Evaluation(long referenceYearId, int year, decimal value, long vehicleId)
            => Update(referenceYearId, year, value, vehicleId);
        #endregion

        #region Methods
        public override bool Validate()
        {
            return ReferenceYearId > 0 && VehicleId > 0 && Year > 0 && Value > 0;
        }

        public void Update(long referenceYearId, int year, decimal value, long vehicleId)
        {
            ReferenceYearId = referenceYearId;
            Year = year;
            Value = value;
            VehicleId = vehicleId;
        }
        #endregion
    }
}
