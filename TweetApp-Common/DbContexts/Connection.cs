namespace TweetApp_Common.DBContext
{
    public class Connection
    {
        public string ConnectionString { get; set; }
        public Connection()
        {
            ConnectionString = "data source=tweetdb; Initial Catalog=Tweet_Server;user ID=SA;password=2Secure*Password2;MultipleActiveResultSets=true";
        }
    }
}
