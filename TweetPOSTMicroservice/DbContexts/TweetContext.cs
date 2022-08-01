using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
