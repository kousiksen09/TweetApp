using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TweetApp_Common;
using TweetApp_Common.DTO;
using TweetApp_Common.Model;

namespace UserMicroservice.Repository
{
    public class JWTAutnenticationManager : IJWTAutnenticationManager
    {

        private readonly UserManager<UserDetails> _userManager;
        private readonly SignInManager<UserDetails> _signInManager;
        private readonly IConfiguration _configuration;
        private IMapper _mapper;


        public JWTAutnenticationManager(
            UserManager<UserDetails> userManger,
            SignInManager<UserDetails> signInManager,

            IConfiguration configuration, IMapper mapper)
        {


            _userManager = userManger;
            _signInManager = signInManager;

            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<AuthResultDTO> Authenticate(LogInDTO logInDTO)
        {
            Helper helper = new Helper();
            AuthResultDTO authResult = new AuthResultDTO();

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
                    var userDetails = await _userManager.FindByNameAsync(userName);

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
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey),
                        SecurityAlgorithms.HmacSha256Signature)
                    };

                    var token = jwtTokenHandler.CreateToken(tokenDescriptor);
                    var tokenForSign = jwtTokenHandler.WriteToken(token);
                    await _userManager.SetAuthenticationTokenAsync(userDetails, tokenDescriptor.Issuer, "LogInToken", tokenForSign);
                    if(String.IsNullOrEmpty(tokenForSign))
                    {
                        authResult.User = null;
                        authResult.AuthToken = null;
                        authResult.Message = "Unable to generate token";
                    }
                    else
                    {
                       var user= _mapper.Map< UserDetails, TweeterUserProfile>(userDetails);
                        authResult.User = user;
                        authResult.AuthToken = tokenForSign;
                        authResult.Message = "Logged In";
                    }
                    return authResult;

                }

                return new AuthResultDTO { AuthToken= null, Message = "Wrong password", User=null};
    
            }
            catch (Exception ex)
            {
                return new AuthResultDTO { Message = ex.Message };
            }

        }

        public async Task<bool> ValidateUser(string userId, string parameter)
        {
            UserDetails user = await _userManager.FindByIdAsync(userId);
            var token = await _userManager.GetAuthenticationTokenAsync(user, _configuration["Jwt:Audience"], "LogInToken");
            if (token == null)
                return false;

            
            //var isValid = await _userManager.VerifyUserTokenAsync(user, _userManager.Options.Tokens.AuthenticatorTokenProvider , "Authentication", token).ConfigureAwait(false);
           if(parameter == token)
            return true;
          return false;

        }

    }
}
