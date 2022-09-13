using AutoMapper;
using TweetApp_Common.DTO;
using TweetApp_Common.Model;

namespace TweetApp_Common
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMap()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<TweetDTO, Tweet>().ReverseMap();
                config.CreateMap<TweetReadDTO, Tweet>().ReverseMap();
                config.CreateMap<TweetUpsertDTO, Tweet>().ReverseMap();
                config.CreateMap<ReplyDTO, TweetReply>().ReverseMap();
                config.CreateMap<ReplyPostDTO, TweetReply>().ReverseMap();
                config.CreateMap<UserDetailsPostDTO, UserDetails>().ReverseMap();
                config.CreateMap<LogInDTO, Tweet>().ReverseMap();
                config.CreateMap<TweeterUserProfile, UserDetails>().ReverseMap();
            });

            return mappingConfig;
        }
    }
}
