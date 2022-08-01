using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TweetApp_Common.DTO
{
    public class ReplyDTO
    {
        public string ReplyTweetBody { get; set; }
        public int Likes { get; set; }
        public string ReplyPostedOn { get; set; }
        public int TweetId { get; set; }
    }
}
