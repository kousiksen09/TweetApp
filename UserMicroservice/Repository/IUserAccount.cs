using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using UserMicroservice.Model;

namespace UserMicroservice.Repository
{
    public interface IUserAccount
    {
        public  Task<ActionStatusDTO> OnPostRegister(UserDetails userDetails);
        public bool AddActiveStatus(string userId);
        public Task<TweeterUserProfile> SearchByUserName (string userName);
        public List<string> FindUserNameFromName(string name);
        public Task<bool> UpdateActiveStatusLoggingIn(string userName);
        public Task<bool> UpdateActiveStatusLoggingOut(string userName);
    }
}
