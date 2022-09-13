using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetPOSTMicroservice.Repository;

namespace TweetPOSTMicroservice.Controllers
{
    [Authorize]
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
        public async Task<IActionResult> Get()
        {
            try
            {
                IEnumerable<TweetReadDTO> tweetDTOs = await _tweetRepository.GetAllTweets();
                if (tweetDTOs.Count() > 0)
                {
                    _response.Result = tweetDTOs;
                    _response.DisplayMessage = "All Tweets received.";
                    _log4net.Info("All Tweets received.");
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Result = tweetDTOs;
                    _response.DisplayMessage = "No Tweets Found.";
                    _log4net.Info("No Tweets Found.");
                    return NotFound(_response);
                }

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went Wrong";
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
                return BadRequest(_response);
            }

        }


        [HttpGet]
        [Route("getMyTweets/{username}")]
        public async Task<IActionResult> Get(string username)
        {
            try
            {
                IEnumerable<TweetReadDTO> tweetDTOs = await _tweetRepository.GetMyTweets(username);
                _response.Result = tweetDTOs;

                if (tweetDTOs.Count() > 0)
                {
                    _response.DisplayMessage = "Received all tweets for a valid logged in user.";
                    _log4net.Info("Received all tweets for a valid logged in user.");
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.DisplayMessage = "No Tweets Found.";
                    _log4net.Info("No Tweets Found.");
                    return NotFound(_response);
                }

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went Wrong";
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
                return BadRequest(_response);
            }
        }

        [HttpGet]
        [Route("getTweet/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                TweetReadDTO tweetDTO = await _tweetRepository.GetTweetById(id);
                _response.Result = tweetDTO;

                if (tweetDTO == null)
                {
                    _response.IsSuccess = false;
                    _response.DisplayMessage = "Invalid TweetID";
                    _log4net.Info("No Tweets Found - Invalid TweetID");
                    return NotFound(_response);
                }
                else
                {
                    _response.DisplayMessage = "Received a single Tweet based on ID.";
                    _log4net.Info("Received a single Tweet based on ID.");
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went Wrong";
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
                return BadRequest(_response);
            }
        }
        [HttpPost]
        [Route("{username}/add")]
        public async Task<IActionResult> Post([FromForm] TweetUpsertDTO tweetDTO, string username)
        {
            try
            {
                if(tweetDTO.PostImage != null)
                {
                    tweetDTO.Image = await _tweetRepository.SaveImage(tweetDTO.PostImage);
                }
                else
                {
                    tweetDTO.Image = null;
                }
                TweetReadDTO tweetmodel = await _tweetRepository.CreateTweet(tweetDTO, userId: username);
                _response.Result = tweetmodel;

                if (tweetmodel == null)
                {
                    _response.IsSuccess = false;
                    _response.DisplayMessage = "Something went wrong with the database please check.";
                    _log4net.Info("Something went wrong with the database please check.");
                    return StatusCode(500, _response);
                }
                else
                {
                    _response.DisplayMessage = "New Tweet Created.";
                    _log4net.Info("New Tweet Created.");
                    return StatusCode(201, _response);
                }

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went Wrong";
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
                return BadRequest(_response);
            }
        }

        [HttpPut]
        [Route("like/{id}")]
        public async Task<IActionResult> Put(int id)
        {
            try
            {
                bool Issuccess = await _tweetRepository.AddLike(id);
                if (Issuccess)
                {
                    _response.DisplayMessage = "New likes added. ";
                    _log4net.Info("New likes added. ");
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = Issuccess;
                    _response.DisplayMessage = "Tweet Dosnt exist. Please provide a valid Tweet ID";
                    _log4net.Info("Tweet Dosnt exist. ");
                    return NotFound(_response);
                }

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = ex.Message;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
                return BadRequest(_response);
            }
        }

        [HttpPut]
        [Route("{username}/update/{id}")]
        public async Task<IActionResult> Put([FromBody] TweetUpsertDTO tweetDTO, int id, string username)
        {
            try
            {
                TweetReadDTO tweetmodel = await _tweetRepository.UpdateTweet(tweetDTO, id, userID: username);
                _response.Result = tweetmodel;

                if (tweetmodel == null)
                {
                    _response.IsSuccess = false;
                    _response.DisplayMessage = "Invalid UserID or TweetID";
                    _log4net.Info("No Tweets updated - Invalid UserID or TweetID");
                    return NotFound(_response);
                }
                else
                {
                    _response.DisplayMessage = "Tweet for id " + tweetmodel.TweetID.ToString() + " is Updated.";
                    _log4net.Info("Tweet for id " + tweetmodel.TweetID.ToString() + " is Updated.");
                    return Ok(_response);
                }

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = ex.Message;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
                return BadRequest(_response);
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool Issuccess = await _tweetRepository.DeleteTweet(id);
                if (Issuccess)
                {
                    _response.DisplayMessage = "Existed Tweet Deleted. ";
                    _log4net.Info("Existed Tweet Deleted. ");
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = Issuccess;
                    _response.DisplayMessage = "Tweet Dosnt exist. Please provide a valid Tweet ID";
                    _log4net.Info("Tweet Dosnt exist. ");
                    return NotFound(_response);
                }

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = ex.Message;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
                return BadRequest(_response);
            }

        }
    }
}
