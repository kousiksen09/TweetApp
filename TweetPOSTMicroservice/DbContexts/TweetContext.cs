using Microsoft.EntityFrameworkCore;
using TweetApp_Common.Model;

namespace TweetPOSTMicroservice.DbContexts
{
    public class TweetContext : DbContext
    {
        public TweetContext(DbContextOptions<TweetContext> options) : base(options)
        {

        }

        public DbSet<Tweet> Tweets { get; set; }
    }
}
