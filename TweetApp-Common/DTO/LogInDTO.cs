using System.ComponentModel.DataAnnotations;

namespace TweetApp_Common.DTO
{
    public class LogInDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string PassWord { get; set; }
        public bool RememberMe { get; set; }
    }
}
