using System;

namespace TweetApp_Common.DTO
{
    public class TweeterUserProfile
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string ProfilePicture { get; set; }
        public bool IsActive { get; set; }
        public DateTime LastSeen { get; set; }
    }
}
