namespace TweetApp_Common.DBContext
{
    public class Connection
    {
        public string ConnectionString { get; set; }
        public Connection()
        {

            //ConnectionString = "Server=CTSDOTNET380;Database=Tweet_Server;User ID=sa;Password=pass@word1;MultipleActiveResultSets=true";
            ConnectionString = "Server=CTSDOTNET376;Database=Tweet_Server;User ID=sa;Password=pass@word1;MultipleActiveResultSets=true";
            //ConnectionString = "data source=KOUSIK-SEN-HP-P\\SQLEXPRESS; Initial Catalog=Tweet_Server;integrated security=true;MultipleActiveResultSets=true";


        }
    }
}
