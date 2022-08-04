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
                new TweetReadDTO { Body = "India", Caption = "Country", Like = 1, TweetID = 1 },
                new TweetReadDTO { Body = "USA", Caption = "Country", Like = 3, TweetID = 2 }
                };

            _repositoryStub.Setup(repo => repo.GetAllTweets()).ReturnsAsync(_listTweets);

            var result = await _tweetAPIController.Get();

            Assert.True((result as ResponseDTO).IsSuccess);
            Assert.IsNotNull(result.Result);
            Assert.That(result.Result, Is.EqualTo(_listTweets));
        }

        [Test]
        public async Task GetAllTweetsAsync_withNoTweets_ReturnNoTweets()
        {
            _listTweets = new List<TweetReadDTO>();

            _repositoryStub.Setup(repo => repo.GetAllTweets()).ReturnsAsync(_listTweets);

            var result = await _tweetAPIController.Get();

            Assert.True((result as ResponseDTO).IsSuccess);
            Assert.That(result.Result, Is.EqualTo(_listTweets));
        }

        [Test]
        [TestCase(1)]
        [TestCase(2)]
        [Parallelizable(ParallelScope.All)]
        public async Task GetTweetsbyIDAsync_giveTweetId_ReturnsTweetById(int id)
        {
            _tweet = new TweetReadDTO() { TweetID = id, Like = 1, Caption = "Country", Body = "UK" };
            var new_tweet = new TweetReadDTO();
            _repositoryStub.Setup(repo => repo.GetTweetById(id)).ReturnsAsync(_tweet);
            var controller = new TweetAPIController(_repositoryStub.Object);

            var result = await controller.Get(id);

            Assert.True(result.IsSuccess);
            Assert.That(result.Result, Is.EqualTo(_tweet));
        }

    }
}
