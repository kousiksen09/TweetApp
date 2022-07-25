using Microsoft.AspNetCore.Identity;
using UserMicroservice.Model;
using TweetApp_Common;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using Microsoft.Extensions.Configuration;

namespace UserMicroservice.Repository
{
    public class JWTAutnenticationManager : IJWTAutnenticationManager
    {
       
        private readonly UserManager<UserDetails> _userManager;
        private readonly SignInManager<UserDetails> _signInManager;
        private readonly IConfiguration _configuration;

        public JWTAutnenticationManager(
            UserManager<UserDetails> userManger,
            SignInManager<UserDetails> signInManager,
            IConfiguration configuration)
        {
          
           
            _userManager = userManger;
            _signInManager = signInManager;
            _configuration = configuration;
        }
     
        public async Task<string> Authenticate(LogInDTO logInDTO)
        {
            Helper helper = new Helper();
          var userName = logInDTO.UserName;
            try
            {
                if (helper.IsValidEmail(logInDTO.UserName))
                {
                    var user = await _userManager.FindByEmailAsync(logInDTO.UserName);
                    if (user != null)
                        userName = user.UserName;
                }
                var result = await _signInManager.PasswordSignInAsync(userName, logInDTO.PassWord, Convert.ToBoolean(logInDTO.RememberMe), false);
                if (result.Succeeded)
                {
                    var jwtTokenHandler = new JwtSecurityTokenHandler();
                    var tokenKey = Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Name, userName)
                        }),
                        Issuer = _configuration["Jwt:Audience"],
                        Audience = _configuration["Jwt:Audience"],
                        Expires = DateTime.UtcNow.AddDays(3),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey),
                        SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = jwtTokenHandler.CreateToken(tokenDescriptor);
                    return jwtTokenHandler.WriteToken(token);
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
