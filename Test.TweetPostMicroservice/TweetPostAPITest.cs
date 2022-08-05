using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetPOSTMicroservice.Controllers;
using TweetPOSTMicroservice.Repository;

namespace Test.TweetPostMicroservice
{
    //[TestFixture]
    //public class TweetPostAPITest
    //{
    //    private Mock<ITweetRepository> _repositoryStub;
    //    private List<TweetReadDTO> _listTweets;
    //    private TweetReadDTO _tweet;
    //    private TweetAPIController _tweetAPIController;

    //    [SetUp]
    //    public void Setup()
    //    {
    //        _repositoryStub = new Mock<ITweetRepository>();
    //        _tweetAPIController = new TweetAPIController(_repositoryStub.Object);
    //    }

    //    [Test]
    //    public async Task GetAllTweetsAsync_withAllTweets_ReturnAllTweets()
    //    {
    //        _listTweets = new List<TweetReadDTO> {
    //            new TweetReadDTO { Body = "India", Caption = "Country", Like = 1, TweetID = 1 },
    //            new TweetReadDTO { Body = "USA", Caption = "Country", Like = 3, TweetID = 2 }
    //            };

    //        _repositoryStub.Setup(repo => repo.GetAllTweets()).ReturnsAsync(_listTweets);

    //        var result = await _tweetAPIController.Get();

    //        Assert.IsNotNull(result.Result);
    //        Assert.That(result.Result, Is.EqualTo(_listTweets));
    //    }

    //    [Test]
    //    public async Task GetAllTweetsAsync_withNoTweets_ReturnNoTweets()
    //    {
    //        _listTweets = new List<TweetReadDTO>();
    //        _repositoryStub.Setup(repo => repo.GetAllTweets()).ReturnsAsync(_listTweets);

    //        var result = await _tweetAPIController.Get();

    //        Assert.That(result.Result, Is.EqualTo(_listTweets));
    //    }

    //    [Test]
    //    [TestCase(1)]
    //    [TestCase(2)]
    //    [Parallelizable(ParallelScope.All)]
    //    public async Task GetTweetbyIDAsync_giveTweetId_ReturnsTweetById(int id)
    //    {
    //        _tweet = new TweetReadDTO() { TweetID = id, Like = 1, Caption = "Country", Body = "UK" };
    //        _repositoryStub.Setup(repo => repo.GetTweetById(id)).ReturnsAsync(_tweet);

    //        var result = await _tweetAPIController.Get(id);

    //        Assert.That(result.Result, Is.EqualTo(_tweet));
    //    }

    //    [Test]
    //    [TestCase(8)]
    //    [TestCase(10)]
    //    [Parallelizable(ParallelScope.All)]
    //    public async Task GetTweetbyIDAsync_giveInvalidTweetId_ReturnsNoTweet(int id)
    //    {
    //        _repositoryStub.Setup(repo => repo.GetTweetById(id));

    //        var result = await _tweetAPIController.Get(id);

    //        Assert.IsNull(result.Result);
    //    }

    //    [Test]
    //    [TestCase("sakdjk21lsdknfdslkfj")]
    //    [Parallelizable(ParallelScope.All)]
    //    public async Task GetMyTweetsAsync_giveUserId_ReturnsTweetsByUserId(string userID)
    //    {
    //        _listTweets = new List<TweetReadDTO>() { 
    //            new TweetReadDTO { TweetID = 1, Like = 1, Caption = "Country", Body = "UK" },
    //            new TweetReadDTO { TweetID = 2, Like = 4, Caption = "State", Body = "WB" },
    //        };
    //        _repositoryStub.Setup(repo => repo.GetMyTweets(userID)).ReturnsAsync(_listTweets);

    //        var result = await _tweetAPIController.Get(userID);

    //        Assert.That(result.Result, Is.EqualTo(_listTweets));
    //    }

    //    [Test]
    //    [TestCase("cndldld2327NKDSADNKS")]
    //    [Parallelizable(ParallelScope.All)]
    //    public async Task GetMyTweetsAsync_InvalidUserId_ReturnNoTweets(string userID)
    //    {
    //        _listTweets = new List<TweetReadDTO>();
    //        _repositoryStub.Setup(repo => repo.GetMyTweets(userID)).ReturnsAsync(_listTweets);

    //        var result = await _tweetAPIController.Get(userID);

    //        Assert.That(result.Result, Is.EqualTo(_listTweets));
    //    }

    //}
}
