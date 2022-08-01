using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TweetApp_Common.Model
{
    public class Tweet
    {
        [Key]
        public int TweetID { get; set; }
        [Required]
        public string Caption { get; set; }
        [Required]
        public string Body { get; set; }
        public int Like { get; set; }
        public string PostedOn { get; set; }
        [Required]
        public int UserId { get; set; }
        public IList<TweetReply> Replies { get; set; }
    }
}
