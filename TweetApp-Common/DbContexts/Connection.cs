namespace TweetApp_Common.DBContext
{
    public class Connection
    {
        public string ConnectionString { get; set; }
        public Connection()
        {
           ConnectionString = "data source=KOUSIK-SEN-HP-P\\SQLEXPRESS; Initial Catalog=Tweet_Server;integrated security=true;MultipleActiveResultSets=true";

        }
    }
}
