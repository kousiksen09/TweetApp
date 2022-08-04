using Microsoft.EntityFrameworkCore;
using TweetApp_Common.Model;

namespace TweetView_ReplyMicroservice.DbContexts
{
    public class TweetReplyContext : DbContext
    {
        public TweetReplyContext(DbContextOptions<TweetReplyContext> options) : base(options)
        {

        }
        public DbSet<TweetReply> TweetReplies { get; set; }

    }
}
