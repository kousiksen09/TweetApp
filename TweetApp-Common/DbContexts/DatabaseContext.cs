using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TweetApp_Common.DBContext;
using TweetApp_Common.Model;

namespace TweetApp_Common.DbContexts
{
    public class DatabaseContext : IdentityDbContext<UserDetails>
    {
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            Connection connection = new Connection();
            dbContextOptionsBuilder.UseSqlServer(connection.ConnectionString);
        }
        public DbSet<TweetReply> TweetReplies { get; set; }
        public DbSet<Tweet> Tweets { get; set; }
        public DbSet<TweetUserActiveStatus> TweetUserActiveStatuses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //builder.Entity<IdentityUser>(entity =>
            //{
            //    entity.ToTable(name: "Tweeter_User");
            //});
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

            builder.Entity<TweetReply>()
                .HasOne<Tweet>(s => s.Tweet)
                .WithMany(ad => ad.Replies)
                .HasForeignKey(ad => ad.TweetId);



        }
    }
}
