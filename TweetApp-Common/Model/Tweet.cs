using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TweetApp_Common.Model
{
    public class Tweet
    {
        [Key]
        public int TweetID { get; set; }
        [Required]
        public string Caption { get; set; }
        [Required]
        public string Image { get; set; }
        public int Like { get; set; }
        public string PostedOn { get; set; }
        [Required]
        [ForeignKey("Id")]
        public string UserId { get; set; }
        public UserDetails User { get; set; }
        public IList<TweetReply> Replies { get; set; }
    }
}
