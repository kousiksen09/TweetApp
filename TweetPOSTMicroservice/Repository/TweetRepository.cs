using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetApp_Common.Model;
using TweetPOSTMicroservice.DbContexts;


namespace TweetPOSTMicroservice.Repository
{
    public class TweetRepository : ITweetRepository
    {
        private readonly TweetContext _db;
        private readonly IMapper _mapper;

        public TweetRepository(TweetContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<bool> DeleteTweet(int tweetID, string username)
        {
            var item = _db.Tweets.AsNoTracking().FirstOrDefault(x => x.TweetID == tweetID && x.UserId == username);
            if (item == null)
            {
                throw new Exception("Invalid TweetID / useid");
            }
            else
            {
                try
                {
                    _db.Tweets.Remove(item);
                    var value = await _db.SaveChangesAsync();
                    if (value > 0)
                    {
                        return true;
                    }
                    throw new Exception("Something went wrong with the database please check.");
                }
                catch (Exception)
                {
                    return false;
                }
            }

        }

        public async Task<bool> AddLike(int tweetID)
        {
            var item = _db.Tweets.AsNoTracking().FirstOrDefault(x => x.TweetID == tweetID);
            if (item == null)
            {
                throw new Exception("Tweet Dosnt exist.");
            }
            else
            {
                try
                {
                    item.Like += 1;
                    _db.Tweets.Update(item);
                    var value = await _db.SaveChangesAsync();
                    if (value > 0)
                    {
                        return true;
                    }
                    throw new Exception("Something went wrong with the database please check.");
                }
                catch (Exception)
                {
                    return false;
                }
            }

        }

        //All Tweets for all user
        public async Task<IEnumerable<TweetReadDTO>> GetAllTweets()
        {
            List<Tweet> tweetList = await _db.Tweets.ToListAsync();
            if (tweetList.Count > 0)
            {
                return _mapper.Map<List<TweetReadDTO>>(tweetList);
            }
            else
            {
                throw new Exception("No Tweets Posted");
            }

        }

        //All tweets for a single User
        public async Task<IEnumerable<TweetReadDTO>> GetMyTweets(string userID)
        {
            List<Tweet> tweetList = await _db.Tweets.Where(x => x.UserId == userID).ToListAsync();
            if (tweetList.Count <= 0)
            {
                throw new Exception("User dosn't exist, Please provide a valid UserID");
            }
            else
            {
                return _mapper.Map<List<TweetReadDTO>>(tweetList);
            }
        }

        //Single tweet
        public async Task<TweetReadDTO> GetTweetById(int tweetId)
        {
            Tweet tweet = await _db.Tweets.FirstOrDefaultAsync(x => x.TweetID == tweetId);
            if (tweet == null)
            {
                throw new Exception("Tweet dosn't exist, Please provide a valid TweetID");
            }
            else
            {
                return _mapper.Map<TweetReadDTO>(tweet);
            }
        }

        //Update an existing Tweet
        public async Task<TweetReadDTO> UpdateTweet(TweetUpsertDTO tweetDTO, int id, string userID)
        {
            if (Entry_Check_Update(id, userID))
            {
                Tweet new_tweet = _mapper.Map<TweetUpsertDTO, Tweet>(tweetDTO);
                new_tweet.TweetID = id;
                new_tweet.PostedOn = DateTime.Now.ToString();
                new_tweet.UserId = userID;
                _db.Tweets.Update(new_tweet);
                var value = await _db.SaveChangesAsync();
                if (value > 0)
                {
                    return _mapper.Map<Tweet, TweetReadDTO>(new_tweet);
                }
                throw new Exception("Something went wrong with the database please check.");
            }
            else
            {
                throw new Exception("Invalid UserID or TweetID");
            }

        }

        //Create a new Tweet
        public async Task<TweetReadDTO> CreateTweet(TweetUpsertDTO tweetDTO, string userId)
        {
            Tweet tweet = _mapper.Map<TweetUpsertDTO, Tweet>(tweetDTO);
            tweet.UserId = userId;
            tweet.PostedOn = DateTime.Now.ToString();
            _db.Tweets.Add(tweet);
            var value = await _db.SaveChangesAsync();
            if (value > 0)
            {
                return _mapper.Map<Tweet, TweetReadDTO>(tweet);
            }
            throw new Exception("Something went wrong with the database please check.");
        }


        public bool Entry_Check_Update(int id, string userId)
        {
            var item = _db.Tweets.AsNoTracking().FirstOrDefault(x => x.TweetID == id && x.UserId == userId);
            if (item == null)
            {
                return false;
            }
            return true;
        }

    }
}
