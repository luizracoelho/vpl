using PriceListsService.Domain.Contracts.Repos;

namespace PriceListsService.Domain.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        #region Repos
        IEvaluationRepo Evaluations { get; }
        IReferenceYearRepo ReferenceYears { get; }
        #endregion

        #region Methods
        Task Commit();
        #endregion
    }
}
