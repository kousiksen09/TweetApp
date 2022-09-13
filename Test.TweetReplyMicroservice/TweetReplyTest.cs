using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetView_ReplyMicroservice.Controllers;
using TweetView_ReplyMicroservice.Repository;

namespace Test.TweetReplyMicroservice
{
    [TestFixture]
    public class TweetReplyTest
    {
        private Mock<ITweetReplyRepository> _repositoryStub;
        private List<ReplyDTO> _listReplies;
        private TweetReplyController _tweetReplyController;

        [SetUp]
        public void Setup()
        {
            _repositoryStub = new Mock<ITweetReplyRepository>();
            _tweetReplyController = new TweetReplyController(_repositoryStub.Object);
        }

        [Test]
        [TestCase("6c501dec-9e5d-4e95-b138-8f8857cadc69")]
        public async Task GetUserReplyAsync_ValidUserId_ReturnAllUserReplies(string userId)
        {
            _listReplies = new List<ReplyDTO>
            {
                new ReplyDTO {ReplyTweetBody = "Test", Likes = 0, ReplyPostedOn = "05-08-2022 13:12:10", TweetId = 1},
                new ReplyDTO {ReplyTweetBody = "Test1", Likes = 1, ReplyPostedOn = "10-08-2022 18:12:10", TweetId = 9}
            };
            _repositoryStub.Setup(repo => repo.GetMyReplies(userId)).ReturnsAsync(_listReplies);

            var result = await _tweetReplyController.GetReplies(userId);
            var contentResult = (result as OkObjectResult).Value;

            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_listReplies, (contentResult as ResponseDTO).Result);
            Assert.True((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase("6c501dec-9e5d-4e95-b138-8f8857cadc69")]
        public async Task GetUserReplyAsync_InvalidUserId_ReturnNoUserReplies(string userId)
        {
            _listReplies = new List<ReplyDTO>();
            _repositoryStub.Setup(repo => repo.GetMyReplies(userId)).ReturnsAsync(_listReplies);

            var result = await _tweetReplyController.GetReplies(userId);
            var contentResult = (result as NotFoundObjectResult).Value;

            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_listReplies, (contentResult as ResponseDTO).Result);
            Assert.False((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase(9)]
        public async Task GetTweetReplyAsync_ValidTweetId_ReturnAllTweetReplies(int tweetId)
        {
            _listReplies = new List<ReplyDTO>
            {
                new ReplyDTO {ReplyTweetBody = "Test", Likes = 0, ReplyPostedOn = "05-08-2022 13:12:10", TweetId = 1},
                new ReplyDTO {ReplyTweetBody = "Test1", Likes = 1, ReplyPostedOn = "10-08-2022 18:12:10", TweetId = 9}
            };
            _repositoryStub.Setup(repo => repo.GetAllRepliesOfTweet(tweetId)).ReturnsAsync(_listReplies);

            var result = await _tweetReplyController.GetRepliesOfTweet(tweetId);
            var contentResult = (result as OkObjectResult).Value;

            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_listReplies, (contentResult as ResponseDTO).Result);
            Assert.True((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase(1000)]
        public async Task GetTweetReplyAsync_InvalidTweetID_ReturnNoTweetReplies(int tweetId)
        {
            _listReplies = new List<ReplyDTO>();
            _repositoryStub.Setup(repo => repo.GetAllRepliesOfTweet(tweetId)).ReturnsAsync(_listReplies);

            var result = await _tweetReplyController.GetRepliesOfTweet(tweetId);
            var contentResult = (result as NotFoundObjectResult).Value;

            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_listReplies, (contentResult as ResponseDTO).Result);
            Assert.False((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase("6c501dec-9e5d-4e95-b138-8f8857cadc69")]
        public async Task GetUserReplyAsync_ValidUserId_PostUserReplies(string userId)
        {
            var reply = new ReplyPostDTO() { ReplyTweetBody = "Test Body", TweetId = 9 };
            var testReply = new ReplyDTO() { ReplyTweetBody = "Test1", Likes = 1, ReplyPostedOn = "10-08-2022 18:12:10", TweetId = 9 };
            _repositoryStub.Setup(repo => repo.CreateTweetReply(reply, userId)).ReturnsAsync(testReply);

            var result = await _tweetReplyController.PostReply(reply, userId);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual((result as ObjectResult).StatusCode, 201);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(testReply, (contentResult as ResponseDTO).Result);
            Assert.True((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase("NONONONONONONOOONONONONONO")]
        public async Task GetUserReplyAsync_InvalidUserId_PostNoUserReplies(string userId)
        {
            var reply = new ReplyPostDTO() { ReplyTweetBody = "Test Body", TweetId = 9 };
            _repositoryStub.Setup(repo => repo.CreateTweetReply(reply, userId));

            var result = await _tweetReplyController.PostReply(reply, userId);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual(400, (result as ObjectResult).StatusCode);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(null, (contentResult as ResponseDTO).Result);
            Assert.False((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase(9)]
        public async Task DeleteUserPost_ValidReplyId_ReplyDeleted(int replyTweetId)
        {
            _repositoryStub.Setup(repo => repo.DeleteReply(replyTweetId)).ReturnsAsync(true);
            var result = await _tweetReplyController.DeleteReply(replyTweetId);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual((result as ObjectResult).StatusCode, 200);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual("Reply deleted successfully!", (contentResult as ResponseDTO).DisplayMessage);
            Assert.True((contentResult as ResponseDTO).IsSuccess);

        }

        [Test]
        [TestCase(9)]
        public async Task DeleteUserPost_InvalidReplyId_NoReplyDeleted(int replyTweetId)
        {
            _repositoryStub.Setup(repo => repo.DeleteReply(replyTweetId)).ReturnsAsync(false);

            var result = await _tweetReplyController.DeleteReply(replyTweetId);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual((result as ObjectResult).StatusCode, 404);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual("Reply Dosn't exist. Please provide a valid Reply ID", (contentResult as ResponseDTO).DisplayMessage);
            Assert.False((contentResult as ResponseDTO).IsSuccess);

        }
    }
}
