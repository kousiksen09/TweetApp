using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TweetApp_Common.Model;

namespace UserMicroservice.Context
{
    public class TweetUserContext : IdentityDbContext<UserDetails>
    {
        public TweetUserContext(DbContextOptions<TweetUserContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityUser>(entity =>
            {
                entity.ToTable(name: "Tweeter_User");
            });
            builder.Entity<IdentityRole>(entity =>
            {
                entity.ToTable(name: "Tweeter_Role");
            });
            builder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.ToTable("Tweeter_UserRoles");
            });
            builder.Entity<IdentityUserClaim<string>>(entity =>
            {
                entity.ToTable("Tweeter_UserClaims");
            });
            builder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.ToTable("Tweeter_UserLogins");
            });
            builder.Entity<IdentityRoleClaim<string>>(entity =>
            {
                entity.ToTable("Tweeter_RoleClaims");
            });
            builder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.ToTable("Tweeter_UserTokens");
            });
        }

        public DbSet<TweetUserActiveStatus> TweetUserActiveStatuses { get; set; }

    }
}
