using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetApp_Common.Model;
using UserMicroservice.Repository;

namespace UserMicroservice.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/v1.0/tweets")]
    public class UserManagementController : ControllerBase
    {
        static readonly log4net.ILog _log4net = log4net.LogManager.GetLogger(typeof(UserManagementController));
        private readonly IUserAccount _userAccount;
        private readonly IJWTAutnenticationManager _authenticationManager;
        public UserManagementController(IUserAccount userAccount, IJWTAutnenticationManager autnenticationManager)
        {
            _userAccount = userAccount;
            _authenticationManager = autnenticationManager; 
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterUser(UserDetailsPostDTO user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _log4net.Info("No Customer has been returned");
                    return BadRequest();
                }
                ActionStatusDTO creationStatus =await _userAccount.OnPostRegister(user);
                if (creationStatus == null)
                {
                    return BadRequest();
                }
                _log4net.Info(creationStatus.Message);
                if (creationStatus.StatusCode == 201)
                {
                    return Ok(creationStatus);
                }
                return BadRequest(creationStatus);
            }
            catch(Exception ex)
            {
                _log4net.Error(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
     

        }
        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LogIn(LogInDTO logInCred)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _log4net.Info("Empty Value passed");
                    return BadRequest();
                }
                var token = await _authenticationManager.Authenticate(logInCred);
                if(token == null)
                {
                    return Unauthorized();
                }
               var isUpdated = await _userAccount.UpdateActiveStatusLoggingIn(logInCred.UserName);
                _log4net.Info("Login Successfull for " + logInCred.UserName);
                return Ok(token);
            }
            catch (Exception ex)
            {
                _log4net.Error("LogIn Attempt Failed " + ex.Message);
                return BadRequest();
            }
        }
      
        [HttpGet]
        [Route("getUsername/{name}")]
        public IActionResult GetUserNamefromName(string name)
        {
            if(name == null)
            {
                return BadRequest();
            }
            try
            {
                var userNameList = _userAccount.FindUserNameFromName(name);
                if(userNameList == null)
                    return NotFound("Nothing found with this name "+name);
                return new OkObjectResult(userNameList);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,ex.Message);
            }
        }

        
        [HttpGet]
        [Route("search/{username}")]
        public async Task<IActionResult> SearchByUserName(string username)
        {
            try
            {
                var user = await _userAccount.SearchByUserName(username);
                if (user == null)
                {
                   return NotFound();
                }
                return new OkObjectResult(user);
            }
            catch (Exception ex)
            {
                _log4net.Info("Error While Searching" + ex.Message);
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPatch]
        [Route("forgetPassword")]

        public async Task<IActionResult> ForgetPassword(ResetPasswordDTO info)
        {
            try
            {
                if (String.IsNullOrEmpty(info.Email) || String.IsNullOrEmpty(info.DOB.ToString()))
                {
                    _log4net.Info("Not all the feilds are filled");
                    return BadRequest("Invalid Input");
                    
                }
                var result = await _userAccount.UpdatePassword(info);
                if (result.Status)
                {
                    return Ok(result);
                }
                _log4net.Error("No users with this informations");
                return BadRequest(result);
            }
            catch(Exception ex)
            {
                _log4net.Error("Internal Errors" + ex.Message);
                return BadRequest();
            }

        }
        [AllowAnonymous]
        [HttpGet]
        [Route("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userAccount.GetAllUsers();
                if (users == null)
                {
                    _log4net.Info("No Users are there");
                    return NotFound("Opppsss!! No users are there");
                }
                return new OkObjectResult(users);
            }
            catch (Exception ex)
            {
                _log4net.Error("Error While Searching" + ex.Message);
                return BadRequest();
            }
        }
    }

   
}
