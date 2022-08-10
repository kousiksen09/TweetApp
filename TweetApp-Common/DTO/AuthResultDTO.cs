using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TweetApp_Common.DTO
{
    public class AuthResultDTO
    {
        public string AuthToken { get; set; }
        public TweeterUserProfile User { get; set; }
        public string Message { get; set; } 
    }
}
