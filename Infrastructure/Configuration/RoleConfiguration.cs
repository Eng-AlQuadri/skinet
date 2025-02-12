using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        builder.HasData(
            new IdentityRole{Id = "1d0583aa-3242-4373-937e-51433986ed53", Name = "Admin", NormalizedName = "ADMIN"},
            new IdentityRole{Id = "cb3eb002-67ec-4d5e-9f03-c0c062f1fae7", Name = "Customer", NormalizedName = "CUSTOMER"}
        );
    }
}