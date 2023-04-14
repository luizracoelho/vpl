using PriceListsService.Domain.Enums;

namespace PriceListsService.Domain.Models
{
    public sealed class ReferenceYear : BaseDomain
    {
        #region Properties
        public int Year { get; private set; }
        public PriceReference PriceReference { get; private set; }
        public IList<Evaluation> Evaluationn { get; private set; }
        #endregion

        #region Constructors
        private ReferenceYear() { }

        public ReferenceYear(int year, PriceReference priceReference)
            => Update(year, priceReference);
        #endregion

        #region Methods
        public override bool Validate()
        {
            return Year > 0 && PriceReference != null;
        }

        public void Update(int year, PriceReference priceReference)
        {
            Year = year;
            PriceReference = priceReference;
        }
        #endregion
    }
}
