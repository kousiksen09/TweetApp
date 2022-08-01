namespace TweetApp.DBContext
{
    internal class Connection
    {
        public string ConnectionString { get; set; }
        public Connection()
        {

            ConnectionString = "Server=CTSDOTNET380;Database=Tweet_Server;User ID=sa;Password=pass@word1;MultipleActiveResultSets=true";
            //ConnectionString = "Server=CTSDOTNET376;Database=Tweet_Server;User ID=sa;Password=pass@word1;MultipleActiveResultSets=true";

        }
    }
}
