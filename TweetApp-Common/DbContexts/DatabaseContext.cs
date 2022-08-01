using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TweetApp.DBContext;
using TweetApp_Common.Model;

namespace TweetApp_Common.DbContexts
{
    class DatabaseContext : DbContext
    {        
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            Connection connection = new Connection();
            dbContextOptionsBuilder.UseSqlServer(connection.ConnectionString);
        }
        public DbSet<TweetReply> TweetReplies { get; set; }
        public DbSet<Tweet> Tweets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TweetReply>()
                .HasOne<Tweet>(s => s.Tweet)
                .WithMany(ad => ad.Replies)
                .HasForeignKey(ad => ad.TweetId);

            modelBuilder.Entity<Tweet>()
                .HasOne<UserDetails>(s => s.User)
                .WithMany(ad => ad.Tweets)
                .HasForeignKey(ad => ad.UserId);
        }
    }    
}
