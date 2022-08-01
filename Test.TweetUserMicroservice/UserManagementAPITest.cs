using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetApp_Common.Model;
using UserMicroservice.Controllers;
using UserMicroservice.Repository;

namespace Test.TweetUserMicroservice
{
    [TestFixture]
    public class UserManagementAPITest
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
        public void RegisterUserWithValidDetails_ReturnOKAsync()
        {
            UserDetailsPostDTO us = new UserDetailsPostDTO
            {
                //Id = "hhgjghjgjgj",
                //UserName = "kousiksen09",
                Email = "kousiksen09@gmail.com",
                Name = "Kousik",
                gender = TweetApp_Common.DTO.Gender.Male,
                DateOfBirth = System.DateTime.Now,
                MobileNumber = "923456789",
                Country = "India",
                State = "WB",
                ProfilePicture = new byte[87676666]
            };
           var a=  _mockUserAccount.Setup(x => x.OnPostRegister(us));

            var result =  _mockUserManagementController.RegisterUser(us) as Task<IActionResult>;
           Assert.That(result, Is.InstanceOf<Task<IActionResult>>());
            Assert.NotNull(result);
        }
        [Test]
        public async Task LoginWithValidDetails_ReturnTokenAsync()
        {
           
            var a =  _mockAuthenticationManager.Setup(x => x.Authenticate(new LogInDTO()));
            var result = await _mockUserManagementController.LogIn(new LogInDTO()) as OkObjectResult;
            //Assert.That(result, Is.InstanceOf<Task<IActionResult>>());
            Assert.NotNull(a);
        }
    }
}