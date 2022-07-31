using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserMicroservice.Model
{
    public class TweetUserActiveStatus
    {
        [Key]
        public int StatusId { get; set; }

        [ForeignKey("UserDetails")]
        public string userDetailsId { get; set; }

        public UserDetails userDetails { get; set; }
        public bool ActiveStatus { get; set; }
        public DateTime LastSeen { get; set; }
    }
}
