using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace TweetApp_Common.Model
{
    public class TweetReply
    {        
        [Key]
        public int ReplyTweetId { get; set; }      
        [Required]
        public string ReplyTweetBody { get; set; }
        public int Likes { get; set; }
        public string ReplyPostedOn { get; set; }
        [Required]
        public string ReplyUserId { get; set; }
        public int TweetId { get; set; }
        public Tweet Tweet { get; set; }

        //[ForeignKey("Tweets")]
        //public int TweetID { get; set; }

    }
}
