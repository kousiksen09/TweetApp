using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetView_ReplyMicroservice.Repository;

namespace TweetView_ReplyMicroservice.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TweetReplyController : ControllerBase
    {
        private static readonly log4net.ILog _log4net = log4net.LogManager.GetLogger(typeof(TweetReplyController));
        private ITweetReplyRepository _repo;
        protected ResponseDTO _response;

        public TweetReplyController(ITweetReplyRepository repo)
        {
            _repo = repo;
            _response = new ResponseDTO();
        }

        [HttpGet]
        [Route("getreply/{userid}")]
        public async Task<IActionResult> GetReplies(string userid)
        {
            try
            {
                IEnumerable<ReplyDTO> ReplyDTOs = await _repo.GetMyReplies(userid);
                if (ReplyDTOs.Any())
                {
                    _response.Result = ReplyDTOs;
                    _log4net.Info("Your Replies received.");
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Result = ReplyDTOs;
                    _response.DisplayMessage = "No replies found";
                    _log4net.Info("No replies found");
                    return NotFound(_response);
                }

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
                return BadRequest();
            }

        }

        [HttpGet]
        [Route("tweetreplies/{tweetId}")]
        public async Task<IActionResult> GetRepliesOfTweet(int tweetId)
        {
            try
            {
                IEnumerable<ReplyDTO> ReplyDTOs = await _repo.GetAllRepliesOfTweet(tweetId);
                if (ReplyDTOs.Any())
                {
                    _response.Result = ReplyDTOs;
                    _response.DisplayMessage = $"All replies recevied for tweet {tweetId}";
                    _log4net.Info("Received all Replies for a single Tweet.");
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Result = ReplyDTOs;
                    _response.DisplayMessage = "No replies found";
                    _log4net.Info("No replies found");
                    return NotFound(_response);
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
                return BadRequest(_response);
            }

        }

        [HttpPost]
        [Route("{userid}/add")]
        public async Task<IActionResult> PostReply([FromForm] ReplyPostDTO reply, string userid)
        {
            try
            {
                var replyRes = await _repo.CreateTweetReply(reply, userid);
                if (replyRes != null)
                {
                    _response.Result = replyRes;
                    _response.DisplayMessage = "Reply posted successfully";
                    _log4net.Info("Reply Tweet posted.");
                    return StatusCode(201, _response);
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.DisplayMessage = "Error posting reply";
                    _log4net.Info("Error creating post");
                    return StatusCode(400, _response);
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _log4net.Error(_response.ErrorMessages);
                return BadRequest(_response);
            }

        }
        [HttpDelete]
        [Route("deletereply/{replyTweetId}")]
        public async Task<IActionResult> DeleteReply(int replyTweetId)
        {
            try
            {
                bool IsSuccess = await _repo.DeleteReply(replyTweetId);
                if (IsSuccess)
                {
                    _response.DisplayMessage = "Reply deleted successfully!";
                    _log4net.Info("Reply deleted successfully!");
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = IsSuccess;
                    _response.DisplayMessage = "Reply Dosn't exist. Please provide a valid Reply ID";
                    _log4net.Info("Reply Dosn't exist. Please provide a valid Reply ID");
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
