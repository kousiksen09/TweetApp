using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetPOSTMicroservice.Controllers;
using TweetPOSTMicroservice.Repository;

namespace Test.TweetPostMicroservice
{
    [TestFixture]
    public class TweetPostAPITest
    {
        private Mock<ITweetRepository> _repositoryStub;
        private List<TweetReadDTO> _listTweets;
        private TweetReadDTO _tweet;
        private TweetAPIController _tweetAPIController;

        [SetUp]
        public void Setup()
        {
            _repositoryStub = new Mock<ITweetRepository>();
            _tweetAPIController = new TweetAPIController(_repositoryStub.Object);
        }

        [Test]
        public async Task GetAllTweetsAsync_withAllTweets_ReturnAllTweets()
        {
            _listTweets = new List<TweetReadDTO> {
                new TweetReadDTO { Image = "India", Caption = "Country", Like = 1, TweetID = 1 },
                new TweetReadDTO { Image = "USA", Caption = "Country", Like = 3, TweetID = 2 }
                };
            _repositoryStub.Setup(repo => repo.GetAllTweets()).ReturnsAsync(_listTweets);

            var result = await _tweetAPIController.Get();
            var contentResult = (result as OkObjectResult).Value;


            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_listTweets, (contentResult as ResponseDTO).Result);
            Assert.True((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        public async Task GetAllTweetsAsync_withNoTweets_ReturnNoTweets()
        {
            _listTweets = new List<TweetReadDTO>();
            _repositoryStub.Setup(repo => repo.GetAllTweets()).ReturnsAsync(_listTweets);

            var result = await _tweetAPIController.Get();
            var contentResult = (result as NotFoundObjectResult).Value;

            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_listTweets, (contentResult as ResponseDTO).Result);
            Assert.False((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase(1)]
        public async Task GetTweetbyIDAsync_giveTweetId_ReturnsTweetById(int id)
        {
            _tweet = new TweetReadDTO() { TweetID = id, Like = id, Caption = "Country", Image = "UK" };
            _repositoryStub.Setup(repo => repo.GetTweetById(id)).ReturnsAsync(_tweet);

            var result = await _tweetAPIController.Get(id);
            var contentResult = (result as OkObjectResult).Value;

            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_tweet, (contentResult as ResponseDTO).Result);
            Assert.True((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase(8)]
        public async Task GetTweetbyIDAsync_giveInvalidTweetId_ReturnsNoTweet(int id)
        {
            _repositoryStub.Setup(repo => repo.GetTweetById(id));

            var result = await _tweetAPIController.Get(id);
            var contentResult = (result as NotFoundObjectResult).Value;

            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(null, (contentResult as ResponseDTO).Result);
            Assert.False((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase("sakdjk21lsdknfdslkfj")]
        public async Task GetMyTweetsAsync_giveUserId_ReturnsTweetsByUserId(string userID)
        {
            _listTweets = new List<TweetReadDTO>() {
                    new TweetReadDTO { TweetID = 1, Like = 1, Caption = "Country", Image = "UK" },
                    new TweetReadDTO { TweetID = 2, Like = 4, Caption = "State", Image = "WB" },
                };
            _repositoryStub.Setup(repo => repo.GetMyTweets(userID)).ReturnsAsync(_listTweets);

            var result = await _tweetAPIController.Get(userID);
            var contentResult = (result as OkObjectResult).Value;

            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_listTweets, (contentResult as ResponseDTO).Result);
            Assert.True((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase("cndldld2327NKDSADNKS")]
        public async Task GetMyTweetsAsync_InvalidUserId_ReturnNoTweets(string userID)
        {
            _listTweets = new List<TweetReadDTO>();
            _repositoryStub.Setup(repo => repo.GetMyTweets(userID)).ReturnsAsync(_listTweets);

            var result = await _tweetAPIController.Get(userID);
            var contentResult = (result as NotFoundObjectResult).Value;

            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_listTweets, (contentResult as ResponseDTO).Result);
            Assert.False((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase("sadafsakdjk21lsdknfdslkfj")]
        public async Task PostTweetsAsync_giveUserIDandPOST_AddtoDBSuccesfully(string userID)
        {
            var postTweet = new TweetUpsertDTO() { Caption = "Country", Image = "India" };
            _tweet = new TweetReadDTO() { TweetID = 1, Like = 0, Caption = "Country", Image = "India" };
            _repositoryStub.Setup(repo => repo.CreateTweet(postTweet, userID)).ReturnsAsync(_tweet);

            var result = await _tweetAPIController.Post(postTweet, userID);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual((result as ObjectResult).StatusCode, 201);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_tweet, (contentResult as ResponseDTO).Result);
            Assert.True((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase("sadafsakdjk21lsdknfdslkfj")]
        public async Task PostTweetsAsync_giveUserIDandPOST_NotAddedToDB(string userID)
        {
            var postTweet = new TweetUpsertDTO() { Caption = "Country", Image = "India" };
            _repositoryStub.Setup(repo => repo.CreateTweet(postTweet, userID));

            var result = await _tweetAPIController.Post(postTweet, userID);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual(500, (result as ObjectResult).StatusCode);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(null, (contentResult as ResponseDTO).Result);
            Assert.False((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase(2, "sadafsakdjk21lsdknfdslkfj")]
        public async Task UpdateTweetAsync_giveTweetIDandUserIDandTweet_UpdatedtoDBSuccesfully(int id, string userID)
        {
            var postTweet = new TweetUpsertDTO() { Caption = "Country", Image = "Brazil" };
            _tweet = new TweetReadDTO() { TweetID = id, Like = 0, Caption = "Country", Image = "Brazil" };
            _repositoryStub.Setup(repo => repo.UpdateTweet(postTweet, id, userID)).ReturnsAsync(_tweet);

            var result = await _tweetAPIController.Put(postTweet, id, userID);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual((result as ObjectResult).StatusCode, 200);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(_tweet, (contentResult as ResponseDTO).Result);
            Assert.True((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase(2, "sadafsakdjk21lsdknfdslkfj")]
        public async Task UpdateTweetAsync_giveTweetIDandUserIDandTweet_NotUpdated(int id, string userID)
        {
            var postTweet = new TweetUpsertDTO() { Caption = "Country", Image = "Brazil" };
            _repositoryStub.Setup(repo => repo.UpdateTweet(postTweet, id, userID));

            var result = await _tweetAPIController.Put(postTweet, id, userID);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual((result as ObjectResult).StatusCode, 404);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual(null, (contentResult as ResponseDTO).Result);
            Assert.False((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase(2)]
        public async Task DeleteTweetAsync_giveTweetID_DeletedtoDBSuccesfully(int id)
        {
            _repositoryStub.Setup(repo => repo.DeleteTweet(id)).ReturnsAsync(true);

            var result = await _tweetAPIController.Delete(id);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual((result as ObjectResult).StatusCode, 200);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual("Existed Tweet Deleted. ", (contentResult as ResponseDTO).DisplayMessage);
            Assert.True((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase(2)]
        public async Task DeleteTweetAsync_giveTweetID_NotFoundTweetForDelete(int id)
        {
            _repositoryStub.Setup(repo => repo.DeleteTweet(id)).ReturnsAsync(false);

            var result = await _tweetAPIController.Delete(id);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual((result as ObjectResult).StatusCode, 404);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual("Tweet Dosnt exist. Please provide a valid Tweet ID", (contentResult as ResponseDTO).DisplayMessage);
            Assert.False((contentResult as ResponseDTO).IsSuccess);
        }

        [Test]
        [TestCase(3)]
        public async Task LikeTweetAsync_giveTweetID_LikeAddedSuccesfully(int id)
        {
            _repositoryStub.Setup(repo => repo.AddLike(id)).ReturnsAsync(true);

            var result = await _tweetAPIController.Put(id);
            var contentResult = (result as ObjectResult).Value;

            Assert.AreEqual((result as ObjectResult).StatusCode, 200);
            Assert.That(contentResult, Is.InstanceOf<ResponseDTO>());
            Assert.AreEqual("New likes added. ", (contentResult as ResponseDTO).DisplayMessage);
            Assert.True((contentResult as ResponseDTO).IsSuccess);
        }

    }
}
