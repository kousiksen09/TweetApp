using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using UserMicroservice.Controllers;
using UserMicroservice.Repository;

namespace Test.TweetUserMicroservice
{
    [TestFixture]
    public class UserManagementAPITest : ControllerBase
    {
        private Mock<IJWTAutnenticationManager> _mockAuthenticationManager;
        private Mock<IUserAccount> _mockUserAccount;
        private UserManagementController _mockUserManagementController;
        [SetUp]
        public void Setup()
        {
            _mockAuthenticationManager = new Mock<IJWTAutnenticationManager>();
            _mockUserAccount = new Mock<IUserAccount>();
            _mockUserManagementController = new UserManagementController
                (_mockUserAccount.Object, _mockAuthenticationManager.Object);
        }


        [Test]
        public async Task RegisterUserWithValidDetails_ReturnOKAsync()
        {
            UserDetailsPostDTO us = new UserDetailsPostDTO
            {
                Email = "kousiksen09@gmail.com",
                Name = "Kousik",
                gender = TweetApp_Common.DTO.Gender.Male,
                DateOfBirth = System.DateTime.Now,
                MobileNumber = "923456789",
                Country = "India",
                State = "WB",
                propImage = "asgzngfzxmjxkufcv"
            };
    
            var a = _mockUserAccount.Setup(x => x.OnPostRegister(us)).Returns(Task.FromResult(new AuthResultDTO()));

            var result = await _mockUserManagementController.RegisterUser(us);
            var contentResult = (result as OkObjectResult).Value;
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.True((contentResult as ResponseDTO).IsSuccess);
            Assert.NotNull(result);
        }
        [Test]
        public async Task LoginWithValidDetails_ReturnTokenAsync()
        {
            LogInDTO logIn = new LogInDTO
            {
                UserName = "rahan@gmail.com",
                PassWord = "Cat$123",
                RememberMe = true
            };
            var a = _mockAuthenticationManager.Setup(x => x.Authenticate(logIn)).ReturnsAsync(new AuthResultDTO());
            var result = await _mockUserManagementController.LogIn(logIn) as OkObjectResult;
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async Task RegisterUserWithInValidDetails_UserShouldnotCreate()
        {
            UserDetailsPostDTO us = new UserDetailsPostDTO
            {
                Email = "kousiksen@@9@gmail.com",
                Name = "",
                gender = TweetApp_Common.DTO.Gender.Male,
                DateOfBirth = System.DateTime.Now,
                MobileNumber = "923456789",
                Country = "India",
                State = "WB",
                propImage = "asgzngfzxmjxkufcv"
        };
            var actionStatus = new ActionStatusDTO { Status = false, StatusCode = StatusCodes.Status500InternalServerError, Message = "User Creation Failed!" };
            var a = _mockUserAccount.Setup(x => x.OnPostRegister(us));

            var result = await _mockUserManagementController.RegisterUser(us);
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task LoginWithInValidDetails_ReturnBadRequest()
        {

            var a = _mockAuthenticationManager.Setup(x => x.Authenticate(null));
            var result = await _mockUserManagementController.LogIn(null);
            var invalidResult = await _mockUserManagementController.LogIn(new LogInDTO
            {
                UserName = "urbun",
                PassWord = "jlkjkljkl",
                RememberMe = false
            });
            Assert.That(result, Is.InstanceOf<BadRequestResult>());
            Assert.That(invalidResult, Is.InstanceOf<UnauthorizedResult>());
        }

        [Test]
        public void GetUserNamefromName_WithValidName_ReturnListOfName()
        {
            List<string> userList = new()
            {
                "kousik123",
                "kousik234"
            };
            var nameSetup = _mockUserAccount.Setup(x => x.FindUserNameFromName("kousik")).Returns(userList);
            var result = _mockUserManagementController.GetUserNamefromName("kousik");
            Assert.IsNotNull(result);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }
        [Test]
        public void GetUserNamefromName_WithInvalidName_ReturnNotFound()
        {
            var nameSetup = _mockUserAccount.Setup(x => x.FindUserNameFromName("kousik"));

            var result = _mockUserManagementController.GetUserNamefromName("kousik");
            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
        }
        [Test]
        public async Task SearchByUserName_WithValidUserName_ReturnUser()
        {
            var userProfile = new TweeterUserProfile()
            {
                UserName = "kousik123",
                Name = "Kousik",
                MobileNumber = "923456789",
                Country = "India",
                State = "WB",
                ProfilePicture = "asgzngfzxmjxkufcv",
            IsActive = true,
                LastSeen = DateTime.Now
            };
            var nameSetup = _mockUserAccount.Setup(x => x.SearchByUserName("kousik123")).ReturnsAsync(userProfile);
            var result = await _mockUserManagementController.SearchByUserName("kousik123");
            Assert.That(result, Is.InstanceOf<OkObjectResult>());

        }
        [Test]
        public async Task ForgetPassword_withValidDetails_UpdatePassword()
        {
            var forgetSetup = new ResetPasswordDTO()
            {
                Password = "demon!123",
                Confirmpassword = "demon!123",
                DOB = Convert.ToDateTime("1990-09-12"),
                Email = "kousik@gmail.com"
            };
            var k = _mockUserAccount.Setup(x => x.UpdatePassword(forgetSetup)).ReturnsAsync(new ActionStatusDTO
            {
                StatusCode = StatusCodes.Status200OK,
                Status = true,
                Message = "Password Reset Succesfully!!"
            });
            var result = await _mockUserManagementController.ForgetPassword(forgetSetup);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async Task ForgetPassword_withInValidDetails_UpdatePassword()
        {
            var forgetSetup = new ResetPasswordDTO()
            {
                Password = "demon!123",
                Confirmpassword = "demon@@123kjkj",
                DOB = Convert.ToDateTime("1990-09-12"),
                Email = "kousik789@gmail.com"
            };
            var k = _mockUserAccount.Setup(x => x.UpdatePassword(forgetSetup));
            var result = await _mockUserManagementController.ForgetPassword(forgetSetup);
            Assert.That(result, Is.InstanceOf<BadRequestResult>());
        }
        [Test]
        public async Task DeleteUser_withValidDetails()
        {
            var k = _mockUserAccount.Setup(x => x.DeleteUser("12345qwert")).ReturnsAsync(true);
            var result = await _mockUserManagementController.DeleteUser("12345qwert");
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async Task DeleteUser_withInValidDetails()
        {
            var k = _mockUserAccount.Setup(x => x.DeleteUser("")).ReturnsAsync(false);
            var result = await _mockUserManagementController.DeleteUser("");
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

    }
}