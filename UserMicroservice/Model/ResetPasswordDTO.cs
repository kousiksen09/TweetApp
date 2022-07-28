using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Model
{
    public class ResetPasswordDTO
    {
        public string Email { get; set; }

        [DataType(DataType.Date)]
        public DateTime DOB { get; set; }
        public string Password { get; set; }
        [Compare("Password", ErrorMessage ="Confirm password should be same with new password!!!")]
        public string Confirmpassword { get; set; }

    }
}
