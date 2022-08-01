using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetPOSTMicroservice.Repository;

namespace TweetPOSTMicroservice.Controllers
{
    [Route("api/v1.0/tweets")]
    [ApiController]
    public class TweetAPIController : ControllerBase
    {
        static readonly log4net.ILog _log4net = log4net.LogManager.GetLogger(typeof(TweetAPIController));
        protected ResponseDTO _response;
        private ITweetRepository _tweetRepository;

        public TweetAPIController(ITweetRepository tweetRepository)
        {
            _tweetRepository = tweetRepository;
            _response = new ResponseDTO();
        }

        [HttpGet]
        [Route("all/")]
        public async Task<object> Get()
        {
            try
            {
                IEnumerable<TweetReadDTO> tweetDTOs = await _tweetRepository.GetAllTweets();
                _response.Result = tweetDTOs;
                _log4net.Info("All Tweets received.");
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
            }

            return _response;
        }

        [HttpGet]
        [Route("{username}")]
        public async Task<object> Get(int username)
        {
            try
            {
                IEnumerable<TweetReadDTO> tweetDTOs = await _tweetRepository.GetMyTweets(username);
                _response.Result = tweetDTOs;
                _log4net.Info("Received all tweets for a valid logged in user.");
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
            }

            return _response;
        }

        [HttpGet]
        [Route("{id}/getTweet")]
        public async Task<object> Get(int id, int? x)
        {
            try
            {
                TweetReadDTO tweetDTO = await _tweetRepository.GetTweetById(id);
                _response.Result = tweetDTO;
                _log4net.Info("Get a single Tweet based on ID.");
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
            }

            return _response;
        }

        [HttpPost]
        [Route("{username}/add")]
        public async Task<object> Post([FromBody] TweetUpsertDTO tweetDTO, int username)
        {
            try
            {
                TweetReadDTO tweetmodel = await _tweetRepository.CreateTweet(tweetDTO, userId: username);
                _response.Result = tweetmodel;
                _log4net.Info("New Tweet Created.");
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
            }

            return _response;
        }

        [HttpPut]
        [Route("{username}/update/{id}")]
        public async Task<object> Put([FromBody] TweetUpsertDTO tweetDTO, int id, int username)
        {
            try
            {
                TweetReadDTO tweetmodel = await _tweetRepository.UpdateTweet(tweetDTO, id, userID: username);
                _response.Result = tweetmodel;
                _log4net.Info("Tweet Updated.");
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
            }

            return _response;
        }

        [HttpDelete]
        [Route("{username}/delete/{id}")]
        public async Task<object> Delete(int id, int username)
        {
            try
            {
                bool Issuccess = await _tweetRepository.DeleteTweet(id, username);
                _response.Result = Issuccess;
                _log4net.Info("Existed Tweet Deleted.");
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
            }

            return _response;
        }
    }
}
