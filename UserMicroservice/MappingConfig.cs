using AutoMapper;
using TweetApp_Common.DTO;
using TweetApp_Common.Model;

namespace UserMicroservice
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMap()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<UserDetailsPostDTO, UserDetails>().ReverseMap();
                //config.CreateMap<LogInDTO, Tweet>().ReverseMap();
                config.CreateMap<TweeterUserProfile, UserDetails>().ReverseMap();
                //config.CreateMap<TweetDetailDTO, TweetDetail>().ReverseMap();
            });

            return mappingConfig;
        }
    }
}
