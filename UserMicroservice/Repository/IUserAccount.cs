using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using TweetApp_Common.DTO;



namespace UserMicroservice.Repository
{
    public interface IUserAccount
    {
        public Task<AuthResultDTO> OnPostRegister(UserDetailsPostDTO userDetails);
        public bool AddActiveStatus(string userId);
        public Task<TweeterUserProfile> SearchByUserName(string userName);
        public List<string> FindUserNameFromName(string name);
        public Task<bool> UpdateActiveStatusLoggingIn(string userName);
        public Task<bool> UpdateActiveStatusLoggingOut(string userName);
        public Task<ActionStatusDTO> UpdatePassword(ResetPasswordDTO resetPasswordDTO);
        public Task<List<TweeterUserProfile>> GetAllUsers();
        public Task<bool> LogOutAsync(string userName);
        public Task<bool> DeleteUser(string userId);
        public Task<string> SaveImage(IFormFile imageFile);
    }
}
