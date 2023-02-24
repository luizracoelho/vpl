using PriceListsService.Domain.Models;
using PriceListsService.Domain.Contracts.Context;
using Microsoft.EntityFrameworkCore;

namespace PriceListsService.Data.Context
{
    public class PriceListsContext : DbContext, IDataContext
    {
        public PriceListsContext(DbContextOptions<PriceListsContext> options) : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PriceListsContext).Assembly);
        }

        #region DbSets
        public DbSet<Evaluation> Evaluations { get; set; }
        public DbSet<ReferenceYear> ReferenceYears { get; set; }
        #endregion
    }
}