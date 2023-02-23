using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PriceListsService.Domain.Models;

namespace PriceListsService.Data.Configs
{
    public class EvaluationConfig : IEntityTypeConfiguration<Evaluation>
    {
        public void Configure(EntityTypeBuilder<Evaluation> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(evaluation => evaluation.ReferenceYear)
                   .WithMany(referenceYear => referenceYear.Evaluationn)
                   .HasForeignKey(evaluation => evaluation.ReferenceYearId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}