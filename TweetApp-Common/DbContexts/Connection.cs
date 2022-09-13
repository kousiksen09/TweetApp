namespace TweetApp_Common.DBContext
{
    public class Connection
    {
        public string ConnectionString { get; set; }
        public Connection()
        {
            //ConnectionString = "data source=KOUSIK-SEN-HP-P\\SQLEXPRESS; Initial Catalog=Tweet_Server;integrated security=true;MultipleActiveResultSets=true";
            ConnectionString = "Server=tcp:tweetapplication-prod.database.windows.net,1433;Initial Catalog=Tweet_Server;Persist Security Info=False;User ID=tweet;Password=Password@123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            //ConnectionString = "data source=localhost,1450; Initial Catalog=Tweet_Server;user id =sa; password=Password@123; MultipleActiveResultSets=true";
        }
        
    }
}
