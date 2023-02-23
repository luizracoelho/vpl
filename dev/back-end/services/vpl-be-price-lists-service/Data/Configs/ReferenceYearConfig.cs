using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PriceListsService.Domain.Models;

namespace PriceListsService.Data.Configs
{
    public class ReferenceYearConfig : IEntityTypeConfiguration<ReferenceYear>
    {
        public void Configure(EntityTypeBuilder<ReferenceYear> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}