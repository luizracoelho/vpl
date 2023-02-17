using PriceListsService.Domain.Models;

namespace PriceListsService.Data.Configs
{
    public class EvaluationConfig : IEntityTypeConfiguration<Evaluation>
    {
        public void Configure(EntityTypeBuilder<Evaluation> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(evaluation => evaluation.ReferenceYear)
                   .WithMany(referenceYear => referenceYear.Models)
                   .HasForeignKey(evaluation => evaluation.ReferenceYearId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}