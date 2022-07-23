using System.Threading.Tasks;
using UserMicroservice.Model;

namespace UserMicroservice.Repository
{
    public interface IJWTAutnenticationManager
    {
       public Task<string> Authenticate(LogInDTO logIn);
    }
}
