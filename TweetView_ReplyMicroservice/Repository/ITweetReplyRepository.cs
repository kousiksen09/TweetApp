using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp_Common.DTO;

namespace TweetView_ReplyMicroservice.Repository
{
    public interface ITweetReplyRepository
    {
        Task<bool> CreateTweetReply(ReplyDTO ReplyDTO, string userId);
        Task<IEnumerable<ReplyDTO>> GetAllRepliesOfTweet(int TweetId);
        Task<IEnumerable<ReplyDTO>> GetMyReplies(string userID);
    }
}
