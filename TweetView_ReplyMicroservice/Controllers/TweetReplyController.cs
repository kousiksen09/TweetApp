using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
        [Route("{userid}")]
        public async Task<object> GetReplies(string userid)
        {
            try
            {
                IEnumerable<ReplyDTO> ReplyDTOs = await _repo.GetMyReplies(userid);
                _response.Result = ReplyDTOs;
                _log4net.Info("All Replies received.");
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
        [Route("{tweetId}/tweetreplies")]
        public async Task<object> GetRepliesOfTweet(int tweetId)
        {
            try
            {
                IEnumerable<ReplyDTO> ReplyDTOs = await _repo.GetAllRepliesOfTweet(tweetId);
                _response.Result = ReplyDTOs;
                _log4net.Info("Received all Replies for a single Tweet.");
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
        [Route("{userid}/add")]
        public async Task<object> PostReply([FromBody] ReplyPostDTO reply, string userid)
        {
            try
            {
                bool Issuccess = await _repo.CreateTweetReply(reply, userid); ;
                _response.Result = Issuccess;
                _log4net.Info("Reply Tweet posted.");
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
