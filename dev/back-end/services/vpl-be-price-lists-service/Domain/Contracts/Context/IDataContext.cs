using Microsoft.EntityFrameworkCore;

namespace PriceListsService.Domain.Contracts.Context
{
    public interface IDataContext
    {
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
    }
}
