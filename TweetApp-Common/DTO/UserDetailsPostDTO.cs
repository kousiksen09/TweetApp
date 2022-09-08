using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }
        public string propImage { get; set; }
       
        public IFormFile ProfilePicture { get; set; }
        //public bool IsActive { get; set; }
        //public DateTime LastSeen { get; set; }
    }
}
