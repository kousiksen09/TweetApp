using System.Threading.Tasks;
using TweetApp_Common.DTO;

namespace UserMicroservice.Repository
{
    public interface IJWTAutnenticationManager
    {
        public Task<AuthResultDTO> Authenticate(LogInDTO logIn);
        public Task<bool> ValidateUser(string userId, string parameter);


    }
}
