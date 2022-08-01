﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TweetApp_Common.Model
{
    public enum Gender
    {
        Male, Female
    }
    public class UserDetails: IdentityUser
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"^([0-9]{10})$", ErrorMessage = "Invalid Mobile Number")]
        public string MobileNumber { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public Gender gender { get; set; }
        public byte[] ProfilePicture { get; set; }
        public IList<Tweet> Tweets { get; set; }


    }
}