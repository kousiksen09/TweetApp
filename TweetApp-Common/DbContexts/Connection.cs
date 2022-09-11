namespace TweetApp_Common.DBContext
{
    public class Connection
    {
        public string ConnectionString { get; set; }
        public Connection()
        {
           //ConnectionString = "data source=KOUSIK-SEN-HP-P\\SQLEXPRESS; Initial Catalog=Tweet_Server;integrated security=true;MultipleActiveResultSets=true";
            ConnectionString = "data source=tweetapplication.database.windows.net; Initial Catalog=Tweet_Server;user id =sa; password=Password@123; MultipleActiveResultSets=true";
            //ConnectionString = "data source=localhost,1450; Initial Catalog=Tweet_Server;user id =sa; password=Password@123; MultipleActiveResultSets=true";
            }
        
    }
}
