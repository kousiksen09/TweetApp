﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetApp_Common.Model;
using UserMicroservice.Context;

namespace UserMicroservice.Repository
{
    public class UserAccount : IUserAccount
    {
        private readonly UserManager<UserDetails> _userManager;
        private readonly IJWTAutnenticationManager _jwtAuthenticationManager;
        private readonly TweetUserContext _tweetUser;
        private readonly SignInManager<UserDetails> _signInManager;
        private IMapper _mapper;
        public UserAccount(UserManager<UserDetails> userManager,
           TweetUserContext tweetUserContext, SignInManager<UserDetails> signInManager,
 IJWTAutnenticationManager jWTAutnenticationManager,
           IMapper mapper
           )

        {
            _userManager = userManager;
            _tweetUser = tweetUserContext;
            _signInManager = signInManager;
            _jwtAuthenticationManager = jWTAutnenticationManager;
            _mapper = mapper;
        }

        public bool AddActiveStatus(string userId)
        {
            if (userId == null)
            {
                return false;
            }
            try
            {
                TweetUserActiveStatus tweetUserActiveStatus = new TweetUserActiveStatus
                {
                    userDetailsId = userId,
                    ActiveStatus = true,
                    LastSeen = DateTime.Now
                };
                _tweetUser.TweetUserActiveStatuses.Add(tweetUserActiveStatus);
                var res = _tweetUser.SaveChanges();
                if (res > 0)
                    return true;

                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<ActionStatusDTO> OnPostRegister(UserDetailsPostDTO userDetails)
        {
            UserDetails user = _mapper.Map<UserDetailsPostDTO, UserDetails>(userDetails);
            if (userDetails == null)
            {
                return new ActionStatusDTO { Status = false, StatusCode = StatusCodes.Status400BadRequest, Message = "Invalide User Input" };
            }
            MailAddress mailAddress = new MailAddress(userDetails.Email);
            string userName = mailAddress.Address.Split('@')[0].ToLower() + userDetails.DateOfBirth.Day.ToString();
            try
            {
                user.UserName = userName;
                var userExists = await _userManager.FindByEmailAsync(userDetails.Email);
                if (userExists != null)
                {
                    return new ActionStatusDTO { Status = false, StatusCode = StatusCodes.Status500InternalServerError, Message = "Already there is an user with the same email" };
                }
                var result = await _userManager.CreateAsync(user, userDetails.PasswordHash);



                if (!result.Succeeded)
                {

                    return new ActionStatusDTO { Status = false, StatusCode = StatusCodes.Status500InternalServerError, Message = "User Creation Failed!" };

                }
                else
                {
                    if (user.Id != null)
                    {
                        var activeStatusCreationStatus = AddActiveStatus(user.Id);
                        if (activeStatusCreationStatus == false)
                        {
                            return new ActionStatusDTO { Status = false, StatusCode = StatusCodes.Status500InternalServerError, Message = "User Creation Failed!" };
                        }
                    }
                    string token = await _jwtAuthenticationManager.Authenticate(new LogInDTO
                    {
                        UserName = userName,
                        PassWord = userDetails.PasswordHash,
                        RememberMe = true
                    });

                    return new ActionStatusDTO
                    {
                        Status = true,
                        StatusCode = StatusCodes.Status201Created,
                        Message = "User has been created successfully!!!    " + "TokenForAuth:" + token.ToString()
                    };

                }
            }
            catch (Exception ex)
            {
                return new ActionStatusDTO { Status = false, StatusCode = StatusCodes.Status500InternalServerError, Message = ex.Message };
            }

        }


        public async Task<TweeterUserProfile> SearchByUserName(string userName)
        {
            try
            {
                if (userName == null)
                    return null;
                //find user by username 
                var user = await _userManager.FindByNameAsync(userName);



                if (user != null)
                {
                    var activeStts = await _tweetUser.TweetUserActiveStatuses.FirstOrDefaultAsync(n => n.userDetailsId == user.Id);

                    TweeterUserProfile tweeterUserProfile = new TweeterUserProfile
                    {
                        Name = user.Name,
                        UserName = user.UserName,
                        MobileNumber = user.MobileNumber,
                        Country = user.Country,
                        State = user.State,
                        ProfilePicture = user.ProfilePicture,
                        IsActive = activeStts.ActiveStatus,
                        LastSeen = activeStts.LastSeen
                    };
                    return tweeterUserProfile;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }

        }
        public List<string> FindUserNameFromName(string name)
        {
            List<string> userName = new List<string>();
            if (name == null)
                return null;
            var users = _userManager.Users.Where(x => x.Name.ToLower().StartsWith(name.ToLower())).ToList();
            if (userName != null)
            {
                foreach (var user in users)
                {
                    userName.Add(user.UserName);
                }
                return userName;
            }
            else
            {
                throw new Exception("No User Found with this name");
            }
        }
        public async Task<bool> UpdateActiveStatusLoggingIn(string userName)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(userName);
                if (user == null)
                    return false;
                var userStatus = _tweetUser.TweetUserActiveStatuses.FirstOrDefault(x => x.userDetailsId == user.Id);
                if (userStatus != null)
                {
                    userStatus.ActiveStatus = true;
                    userStatus.LastSeen = DateTime.Now;
                    var res = _tweetUser.SaveChanges();
                    if (res >= 1)
                        return true;
                    return false;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
                throw new Exception(ex.Message);

            }


        }

        public async Task<bool> UpdateActiveStatusLoggingOut(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
                return false;
            var userStatus = _tweetUser.TweetUserActiveStatuses.FirstOrDefault(x => x.userDetailsId == user.Id);
            if (userStatus != null)
            {
                userStatus.ActiveStatus = false;
                userStatus.LastSeen = DateTime.Now;
                var res = _tweetUser.SaveChanges();
                await _userManager.RemoveAuthenticationTokenAsync(user, "https://localhost:5001", "LogInToken");

                if (res >= 1)
                    return true;
                return false;
            }
            return false;

        }

        public async Task<ActionStatusDTO> UpdatePassword(ResetPasswordDTO resetPasswordDTO)
        {
            if (resetPasswordDTO.Email == null)
            {
                return new ActionStatusDTO
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Status = false,
                    Message = "Please enter a valid email"
                };
            }
            try
            {
                var user = await _userManager.FindByEmailAsync(resetPasswordDTO.Email);
                if (user == null)
                {
                    return new ActionStatusDTO
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Status = false,
                        Message = "Oppsss!!! No user is there with this mail ID"
                    };
                }
                if (resetPasswordDTO.DOB == user.DateOfBirth)
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var isChanged = await _userManager.ResetPasswordAsync(user, token, resetPasswordDTO.Confirmpassword);
                    if (isChanged.Succeeded)
                    {
                        return new ActionStatusDTO
                        {
                            StatusCode = StatusCodes.Status200OK,
                            Status = true,
                            Message = "Password Reset Succesfully!!"
                        };
                    }
                }
                return new ActionStatusDTO
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Status = false,
                    Message = "Oppsss!!! Something went wrong"
                };
            }
            catch (Exception ex)
            {
                return new ActionStatusDTO
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Status = false,
                    Message = "Oppsss!!! Something went wrong" + ex.Message
                };
            }

        }

        public async Task<List<TweeterUserProfile>> GetAllUsers()
        {
            List<TweeterUserProfile> allUsers = new List<TweeterUserProfile>();
            try
            {
                var users = _userManager.Users.ToList();
                foreach (var user in users)
                {
                    var activeStts = await _tweetUser.TweetUserActiveStatuses.FirstOrDefaultAsync(n => n.userDetailsId == user.Id);
                    allUsers.Add(new TweeterUserProfile
                    {
                        UserName = user.UserName,
                        Name = user.Name,
                        MobileNumber = user.MobileNumber,
                        State = user.State,
                        Country = user.Country,
                        ProfilePicture = user.ProfilePicture,
                        IsActive = activeStts.ActiveStatus,
                        LastSeen = activeStts.LastSeen
                    }
                    );
                }
                return allUsers;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public async Task<bool> LogOutAsync(string username)
        {

            if (username == null)
                return false;
            bool activestat = await UpdateActiveStatusLoggingOut(username);
            if (activestat)
            {

                await _signInManager.SignOutAsync();
                return true;
            }
            else
            {
                return false;
                throw new Exception("No user with this name");
            }
        }
    }
}
