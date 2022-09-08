using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using TweetApp_Common.DTO;

namespace TweetPOSTMicroservice.Repository
{
    public interface ITweetRepository
    {
        Task<IEnumerable<TweetReadDTO>> GetAllTweets();
        Task<IEnumerable<TweetReadDTO>> GetMyTweets(string userID);
        Task<TweetReadDTO> GetTweetById(int tweetId);
        Task<TweetReadDTO> UpdateTweet(TweetUpsertDTO tweetDTO, int id, string userID);
        Task<TweetReadDTO> CreateTweet(TweetUpsertDTO tweetDTO, string userId);
        Task<bool> DeleteTweet(int tweetID);
        Task<bool> AddLike(int tweetID);
        public Task<string> SaveImage(IFormFile imageFile);
    }
}
