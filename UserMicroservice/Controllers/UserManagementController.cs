using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using UserMicroservice.Repository;
using TweetApp_Common;

namespace UserMicroservice.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/v1.0/tweets")]
    public class UserManagementController : ControllerBase
    {
        private static readonly log4net.ILog _log4net = log4net.LogManager.GetLogger(typeof(UserManagementController));
        private readonly IUserAccount _userAccount;

        private readonly IJWTAutnenticationManager _authenticationManager;
        protected ResponseDTO _response;
        
       

        public UserManagementController(IUserAccount userAccount, IJWTAutnenticationManager autnenticationManager)
        {
           
            _userAccount = userAccount;
            _authenticationManager = autnenticationManager;           
            _response = new ResponseDTO();

        }
        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterUser([FromForm] UserDetailsPostDTO user)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    _log4net.Info("No Customer has been returned");
                    return BadRequest();
                }
                if (user.ProfilePicture != null)
                {
                    user.propImage = await _userAccount.SaveImage(user.ProfilePicture);
                }
                else
                {
                    user.propImage = null;
                }
                var result = await _userAccount.OnPostRegister(user);
                if (result == null)
                {
                    return BadRequest();
                }
                if (result.AuthToken != null)
                {
                    _response.IsSuccess = true;
                    _response.DisplayMessage = "User Has been Created";
                    _response.ErrorMessages = null;
                    result.User.ProfilePicture = user.propImage;
                    _response.Result = result;
                    _log4net.Info(_response.DisplayMessage);
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.DisplayMessage = "User not Created";
                    _response.ErrorMessages = new List<string>() { result.Message };
                    _response.Result = null;
                    return Unauthorized(_response);
                }
            }
            catch (Exception ex)
            {
                _log4net.Error(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }


        }
        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LogIn([FromForm]LogInDTO logInCred)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _log4net.Info("Empty Value passed");
                    return BadRequest();
                }
                var token = await _authenticationManager.Authenticate(logInCred);
                if (token.AuthToken == null)
                {
                    return Unauthorized(token.Message);
                }
                var isUpdated = await _userAccount.UpdateActiveStatusLoggingIn(logInCred.UserName);
                _log4net.Info("Login Successfull for " + logInCred.UserName);
                if (isUpdated)
                {
                    _response.Result = token;
                    _response.IsSuccess = true;
                    _response.DisplayMessage = "Logged IN";
                    return Ok(_response);
                }
                return BadRequest();
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
            if (name == null)
            {
                return BadRequest();
            }
            try
            {

                var userNameList = _userAccount.FindUserNameFromName(name);
                if (userNameList == null)
                    return NotFound("Nothing found with this name " + name);
                return new OkObjectResult(userNameList);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
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
            catch (Exception ex)
            {
                _log4net.Error("Internal Errors" + ex.Message);
                return BadRequest();
            }

        }

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

        [HttpPost]
        [Route("LogOut")]
        public async Task<IActionResult> LogOut(string userName)
        {
            try
            {
                var isLogOut = await _userAccount.LogOutAsync(userName);
                if (isLogOut)
                    return Ok("User has been Loggedout");
                return BadRequest("Failed to Logout");

            }
            catch (Exception ex)
            {
                _log4net.Error(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [AllowAnonymous]
        [HttpDelete]
        [Route("DeleteUser")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            if (userId == null)
            {
                return BadRequest(userId);
            }
            try
            {
                var result = await _userAccount.DeleteUser(userId);
                if (result)
                    return Ok("User has been deleted");
                return BadRequest("Failed to delete");

            }
            catch (Exception ex)
            {
                _log4net.Error(ex.Message);
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("ValidateUser")]
        public async Task<IActionResult> ValidateUser(string userId, [FromHeader] string authorization)
        {
            if (userId == null)
            {
                return BadRequest(userId);
            }
            try
            {
                if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue))
                {
                    // we have a valid AuthenticationHeaderValue that has the following details:

                    var scheme = headerValue.Scheme;
                    var parameter = headerValue.Parameter;



                    var result = await _authenticationManager.ValidateUser(userId, parameter);
                    if (result)
                        return Ok("User Exist");
                }
                return Unauthorized();

            }
            catch (Exception ex)
            {
                _log4net.Error(ex.Message);
                return BadRequest(ex.Message);
            }
        }

    






    }
}
