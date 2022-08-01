using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp_Common.DTO;

namespace TweetPOSTMicroservice.Repository
{
    public interface ITweetRepository
    {
        Task<IEnumerable<TweetReadDTO>> GetAllTweets();
        Task<IEnumerable<TweetReadDTO>> GetMyTweets(int userID);
        Task<TweetReadDTO> GetTweetById(int tweetId);
        Task<TweetReadDTO> UpdateTweet(TweetUpsertDTO tweetDTO, int id, int userID);
        Task<TweetReadDTO> CreateTweet(TweetUpsertDTO tweetDTO, int userId);
        Task<bool> DeleteTweet(int tweetID, int username);
    }
}
