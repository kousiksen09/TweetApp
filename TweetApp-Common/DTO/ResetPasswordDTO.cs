using System;
using System.ComponentModel.DataAnnotations;

namespace TweetApp_Common.DTO
{
    public class ResetPasswordDTO
    {
        public string Email { get; set; }

        [DataType(DataType.Date)]
        public DateTime DOB { get; set; }
        public string Password { get; set; }
        [Compare("Password", ErrorMessage = "Confirm password should be same with new password!!!")]
        public string Confirmpassword { get; set; }

    }
}
