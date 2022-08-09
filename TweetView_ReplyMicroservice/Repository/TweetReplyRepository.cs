using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetApp_Common.Model;
using TweetView_ReplyMicroservice.DbContexts;



namespace TweetView_ReplyMicroservice.Repository
{
    public class TweetReplyRepository : ITweetReplyRepository
    {
        private readonly TweetReplyContext _context;
        private IMapper _mapper;
        public TweetReplyRepository(TweetReplyContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ReplyDTO> CreateTweetReply(ReplyPostDTO replyPostDTO, string ReplyuserId)
        {
            try
            {
                TweetReply reply = _mapper.Map<ReplyPostDTO, TweetReply>(replyPostDTO);
                reply.ReplyUserId = ReplyuserId;
                reply.ReplyPostedOn = DateTime.Now.ToString();
                await _context.TweetReplies.AddAsync(reply);
                _context.SaveChanges();
                return _mapper.Map<TweetReply, ReplyDTO>(reply);
            }
            catch (Exception exp)
            {
                Console.WriteLine(exp.Message);
                return null;
            }
        }

        public async Task<bool> DeleteReply(int replyTweetId)
        {
            try
            {
                var reply = _context.TweetReplies.FirstOrDefault(x => x.ReplyTweetId == replyTweetId);
                _context.TweetReplies.Remove(reply);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<IEnumerable<ReplyDTO>> GetAllRepliesOfTweet(int TweetId)
        {
            var replies = await _context.TweetReplies.Where(x => x.TweetId == TweetId).ToListAsync();
            return _mapper.Map<List<ReplyDTO>>(replies);
        }

        public async Task<IEnumerable<ReplyDTO>> GetMyReplies(string userID)
        {
            var myReplies = await _context.TweetReplies.Where(x => x.ReplyUserId == userID).ToListAsync();
            return _mapper.Map<List<ReplyDTO>>(myReplies);
        }
    }
}
