using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using UserMicroservice.Model;

namespace UserMicroservice.Repository
{
    public interface IUserAccount
    {
        public  Task<ActionStatusDTO> OnPostRegister(UserDetails userDetails);
        public bool AddActiveStatus(string userId);
        public Task<bool> UpdateActiveStatusLoggingIn(string userName);
        public Task<bool> UpdateActiveStatusLoggingOut(string userName);
    }
}
