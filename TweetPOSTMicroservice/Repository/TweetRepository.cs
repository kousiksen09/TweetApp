using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
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
        public readonly IWebHostEnvironment hostEnvironment;
        //public readonly HttpRequest httpRequest;

        public TweetRepository(TweetContext db, IMapper mapper, IWebHostEnvironment _hostEnvironment)
        {
            _db = db;
            _mapper = mapper;
            hostEnvironment = _hostEnvironment;
            
        }

        public async Task<bool> DeleteTweet(int tweetID)
        {
            var item = _db.Tweets.FirstOrDefault(x => x.TweetID == tweetID);
            if (item == null)
            {
                //throw new Exception("Invalid TweetID");
                return false;
            }
            else
            {
                _db.Tweets.Remove(item);
                var value = await _db.SaveChangesAsync();
                if (value > 0)
                {
                    return true;
                }
                throw new Exception("Something went wrong with the database please check.");
            }

        }

        public async Task<bool> AddLike(int tweetID)
        {
            var item = _db.Tweets.FirstOrDefault(x => x.TweetID == tweetID);
            if (item == null)
            {
                return false;
            }
            else
            {
                item.Like += 1;
                _db.Tweets.Update(item);
                var value = await _db.SaveChangesAsync();
                if (value > 0)
                {
                    return true;
                }
                else
                {
                    throw new Exception("Something went wrong with the database please check.");
                }
            }

        }

        public async Task<IEnumerable<TweetReadDTO>> GetAllTweets()
        {
            List<TweetReadDTO> finaltweets = new List<TweetReadDTO>();
            List<Tweet> tweetList = await _db.Tweets.ToListAsync();
            foreach (var tweets in tweetList)
            {
                finaltweets.Add(new TweetReadDTO
                {
                    Like = tweets.Like,
                    UserId = tweets.UserId,
                    TweetID = tweets.TweetID,
                    Caption = tweets.Caption,
                    Image = tweets.Image
                }
                 );
            }
            return finaltweets;
        }

        //All tweets for a single User
        public async Task<IEnumerable<TweetReadDTO>> GetMyTweets(string userID)
        {
            List<TweetReadDTO> finaltweets = new List<TweetReadDTO>();
            List<Tweet> tweetList = await _db.Tweets.Where(x => x.UserId == userID).ToListAsync();
            foreach( var tweets in tweetList)
            {
                finaltweets.Add(new TweetReadDTO
                {
                    Like = tweets.Like,
                    UserId = tweets.UserId,
                    TweetID = tweets.TweetID,
                    Caption = tweets.Caption,
                    Image =  tweets.Image
            }
                 );
            }
            return finaltweets;
        }

        //Single tweet
        public async Task<TweetReadDTO> GetTweetById(int tweetId)
        {
            Tweet tweet = await _db.Tweets.FirstOrDefaultAsync(x => x.TweetID == tweetId);
            tweet.Image =  tweet.Image;
            return _mapper.Map<TweetReadDTO>(tweet);
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
                    new_tweet.Image =  tweetDTO.Image;
                    return _mapper.Map<Tweet, TweetReadDTO>(new_tweet);
                }
                throw new Exception("Something went wrong with the database please check.");
            }
            else
            {
                return null;
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
                TweetReadDTO tweets = new TweetReadDTO();
                tweet.Image =  tweetDTO.Image;
                return _mapper.Map<Tweet, TweetReadDTO>(tweet);
            }
            else
            {
                return null;
            }
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
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string name = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            string imageName = name + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);

            //var imgPath = Path.Combine(hostEnvironment.ContentRootPath, "Images", imageName);
            //using (var fileStream = new FileStream(imgPath, FileMode.Create))
            //{
            //    await imageFile.CopyToAsync(fileStream);
            //}

            return imageName;
        }

    }
}
