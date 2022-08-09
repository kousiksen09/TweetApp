namespace TweetApp_Common.DBContext
{
    public class Connection
    {
        public string ConnectionString { get; set; }
        public Connection()
        {

            
           ConnectionString = "Data Source=sqldb;Initial Catalog=Tweet_Server;Persist Security Info=True;User ID=sa;Password=Password@123";

           // ConnectionString = "data source=KOUSIK-SEN-HP-P\\SQLEXPRESS; Initial Catalog=Tweet_Server;integrated security=true;MultipleActiveResultSets=true";


        }
    }
}
