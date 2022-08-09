using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TweetView_ReplyMicroservice.Controllers;
using TweetView_ReplyMicroservice.Repository;

namespace Test.TweetReplyMicroservice
{
    [TestFixture]
    public class TweetReplyTest
    {
        private Mock<ITweetReplyRepository> _repositoryStub;
        private TweetReplyController _tweetReplyController;

        [SetUp]
        public void Setup()
        {
            _repositoryStub = new Mock<ITweetReplyRepository>();
            _tweetReplyController = new TweetReplyController(_repositoryStub.Object);
        }
    }
}
