using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
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
                ProfilePicture = new byte[87676666]
            };
            var actionStatus = new ActionStatusDTO { Status = true, StatusCode = StatusCodes.Status201Created, Message = "User has been created successfully!!!" };
            var a = _mockUserAccount.Setup(x => x.OnPostRegister(us)).Returns(Task.FromResult(actionStatus));

            var result = await _mockUserManagementController.RegisterUser(us);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
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
            var a = _mockAuthenticationManager.Setup(x => x.Authenticate(logIn)).Returns(Task.FromResult("token"));
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
                ProfilePicture = new byte[87676666]
            };
            var actionStatus = new ActionStatusDTO { Status = false, StatusCode = StatusCodes.Status500InternalServerError, Message = "User Creation Failed!" };
            var a = _mockUserAccount.Setup(x => x.OnPostRegister(us)).Returns(Task.FromResult(actionStatus));

            var result = await _mockUserManagementController.RegisterUser(us);
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task LoginWithInValidDetails_ReturnBadRequest()
        {

            var a = _mockAuthenticationManager.Setup(x => x.Authenticate(null)).Returns(Task.FromResult(string.Empty));
            var result = await _mockUserManagementController.LogIn(null);
            Assert.That(result, Is.InstanceOf<BadRequestResult>());
        }
    }
}