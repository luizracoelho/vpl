using PriceListsService.Data.Context;
using PriceListsService.Data.Repos;
using PriceListsService.Domain.Contracts;
using PriceListsService.Domain.Contracts.Repos;

namespace PriceListsService.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PriceListsContext _context;
        public UnitOfWork(PriceListsContext context) => _context = context;

        #region Repos
        private EvaluationRepo _brandRepo;
        public IEvaluationRepo Evaluations => _brandRepo ??= new EvaluationRepo(_context);

        private ReferenceYearRepo _modelRepo;
        public IReferenceYearRepo ReferenceYears => _modelRepo ??= new ReferenceYearRepo(_context);
        #endregion

        #region Methods
        public async Task Commit() => await _context.SaveChangesAsync();

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
                if (disposing)
                    _context.Dispose();

            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
