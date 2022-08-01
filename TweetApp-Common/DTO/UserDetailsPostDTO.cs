using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TweetApp_Common.DTO
{
    public enum Gender
    {
        Male, Female
    }
    public class UserDetailsPostDTO
    {
        //public string UserName { get; set; }
        public string Name { get; set; }
        public string PasswordHash { get; set; }
        public string MobileNumber { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Email { get; set; }
        public Gender gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public byte[] ProfilePicture { get; set; }
        //public bool IsActive { get; set; }
        //public DateTime LastSeen { get; set; }
    }
}
