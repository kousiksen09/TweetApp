using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp_Common.DTO;
using TweetApp_Common.Model;

namespace TweetView_ReplyMicroservice
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMap()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<ReplyDTO, TweetReply>().ReverseMap();                
            });

            return mappingConfig;
        }
    }
}
