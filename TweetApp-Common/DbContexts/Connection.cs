namespace TweetApp_Common.DBContext
{
    public class Connection
    {
        public string ConnectionString { get; set; }
        public Connection()
        {
            //ConnectionString = "Server=localhost,1450;Database=Tweet_Server;User ID=SA;Password=Password@123;MultipleActiveResultSets=true";
            ConnectionString = "Server=tweetdb;Database=Tweet_Server;User ID=SA;Password=Password@123;MultipleActiveResultSets=true";
            //ConnectionString = "Server=CTSDOTNET376;Database=Tweet_Server;User ID=sa;Password=pass@word1;MultipleActiveResultSets=true";
        }
    }
}
