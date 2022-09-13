using Microsoft.AspNetCore.Http;

namespace TweetApp_Common.DTO
{
    public class TweetUpsertDTO
    {
        public string Caption { get; set; }
        public string Image { get; set; }
        
        public IFormFile PostImage { get; set; }
    }
}
