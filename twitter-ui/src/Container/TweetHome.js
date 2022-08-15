import LeftNavBar from '../Component/LeftNavBar';
import { useTheme } from '@emotion/react';
import { Grid, useMediaQuery } from '@mui/material';
import WhatsHappening from '../Component/WhatsHappening';
import '../Utility/TweetHomeStyle.css';
import PostTweet from '../Component/PostTweet';
import TweetCard from '../UtilityComponent/TweetCard';
import Radhika from '../Utility/image/Radhika.jfif';

export default function TweetHome() {
  const theme = useTheme();
  const screenChange = useMediaQuery(theme.breakpoints.up('md'));
  if (screenChange)
    return (
      <Grid container>
        <LeftNavBar />
        <WhatsHappening />
        <div className='mainTweet'>
          <PostTweet profilePic={Radhika} />
          <div className='tweetFeed'>
            <TweetCard
              profilePic={Radhika}
              Name='Kousik Sen'
              userName='@ ksen6'
              postAgo='6h'
              reactionCount='20'
              postImg={
                'https://pbs.twimg.com/media/FZ4cKrnWYAIaJZ2?format=jpg&name=900x900'
              }
            />
            <TweetCard
              profilePic={Radhika}
              Name='Kousik Sen'
              userName='@ ksen6'
              postAgo='6h'
              reactionCount='20'
              postImg={
                'https://pbs.twimg.com/media/FZ4cKrnWYAIaJZ2?format=jpg&name=900x900'
              }
            />
            <TweetCard
              profilePic={Radhika}
              Name='Kousik Sen'
              userName='@ ksen6'
              postAgo='6h'
              reactionCount='20'
              postImg={
                'https://pbs.twimg.com/media/FaBtmVOVEAEnXZk?format=jpg&name=900x900'
              }
            />
            <TweetCard
              profilePic={Radhika}
              Name='Kousik Sen'
              userName='@ ksen6'
              postAgo='6h'
              reactionCount='20'
              postImg={
                'https://pbs.twimg.com/media/FaA3vEMWAAEvSsL?format=jpg&name=900x900'
              }
            />
            <TweetCard
              profilePic={Radhika}
              Name='Kousik Sen'
              userName='@ ksen6'
              postAgo='6h'
              reactionCount='20'
              postImg={
                'https://pbs.twimg.com/media/FZ4cKrnWYAIaJZ2?format=jpg&name=900x900'
              }
            />
            <TweetCard
              profilePic={Radhika}
              Name='Kousik Sen'
              userName='@ ksen6'
              postAgo='6h'
              reactionCount='20'
              postImg={
                'https://pbs.twimg.com/media/FZ4cKrnWYAIaJZ2?format=jpg&name=900x900'
              }
            />
          </div>
        </div>
      </Grid>
    );
  else
    return (
      <div className='mainTweet'>
        <PostTweet profilePic={Radhika} />
        <div className='tweetFeed'>
          <TweetCard
            profilePic={Radhika}
            Name='Kousik Sen'
            userName='@ ksen6'
            postAgo='6h'
            reactionCount='20'
            postImg={
              'https://pbs.twimg.com/media/FZ4cKrnWYAIaJZ2?format=jpg&name=900x900'
            }
          />
          <TweetCard
            profilePic={Radhika}
            Name='Kousik Sen'
            userName='@ ksen6'
            postAgo='6h'
            reactionCount='20'
            postImg={
              'https://pbs.twimg.com/media/FZ4cKrnWYAIaJZ2?format=jpg&name=900x900'
            }
          />
          <TweetCard
            profilePic={Radhika}
            Name='Kousik Sen'
            userName='@ ksen6'
            postAgo='6h'
            reactionCount='20'
            postImg={
              'https://pbs.twimg.com/media/FaBtmVOVEAEnXZk?format=jpg&name=900x900'
            }
          />
          <TweetCard
            profilePic={Radhika}
            Name='Kousik Sen'
            userName='@ ksen6'
            postAgo='6h'
            reactionCount='20'
            postImg={
              'https://pbs.twimg.com/media/FaA3vEMWAAEvSsL?format=jpg&name=900x900'
            }
          />
          <TweetCard
            profilePic={Radhika}
            Name='Kousik Sen'
            userName='@ ksen6'
            postAgo='6h'
            reactionCount='20'
            postImg={
              'https://pbs.twimg.com/media/FZ4cKrnWYAIaJZ2?format=jpg&name=900x900'
            }
          />
          <TweetCard
            profilePic={Radhika}
            Name='Kousik Sen'
            userName='@ ksen6'
            postAgo='6h'
            reactionCount='20'
            postImg={
              'https://pbs.twimg.com/media/FZ4cKrnWYAIaJZ2?format=jpg&name=900x900'
            }
          />
        </div>
      </div>
    );
}
