using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TweetApp_Common.DTO
{
    public class ReplyPostDTO
    {
        public string ReplyTweetBody { get; set; }       
        
        public int TweetId { get; set; }
    }
}
