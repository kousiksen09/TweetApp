namespace TweetApp_Common.DTO
{
    public class TweetDTO
    {
        public int TweetID { get; set; }
        public string Caption { get; set; }
        public string Body { get; set; }
        public int Like { get; set; }
        public string PostedOn { get; set; }
        public int UserId { get; set; }
    }
}
