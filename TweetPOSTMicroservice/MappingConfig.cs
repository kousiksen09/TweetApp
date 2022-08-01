using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetApp_Common.Model;

namespace TweetPOSTMicroservice
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
                //config.CreateMap<TweetDetailDTO, TweetDetail>().ReverseMap();
            });

            return mappingConfig;
        }
    }
}
