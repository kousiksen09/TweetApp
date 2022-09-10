namespace TweetApp_Common.DTO
{
    public class ReplyDTO
    {
        public string ReplyTweetBody { get; set; }
        public int Likes { get; set; }
        public string ReplyPostedOn { get; set; }
        public int TweetId { get; set; }

        public string ReplyUserId { get; set; }
    }
}
