import LeftNavBar from '../Component/LeftNavBar';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, useMediaQuery } from '@mui/material';
import WhatsHappening from '../Component/WhatsHappening';
import '../Utility/TweetHomeStyle.css';
import PostTweet from '../Component/PostTweet';
import TweetCard from '../UtilityComponent/TweetCard';
import Radhika from '../Utility/image/Radhika.jfif';
import { useEffect } from 'react';
import { profileapiFetchInitiated } from '../Redux/Action/ProfileFetch';
import { isAuthenticated, userAction } from '../Redux/Action/UserAction';
import CircularLoader from '../Utility/HelperComponent/CircularLoader';
import { getAllUserapiFetchInitiated } from '../Redux/Action/GetAllUserAction';

export default function TweetHome() {
  const theme = useTheme();
  const screenChange = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('userName'),
    };
    if (payload.id !== null && payload.token !== null)
      dispatch(profileapiFetchInitiated(payload));
    dispatch(getAllUserapiFetchInitiated(payload));
  }, [dispatch]);
  const profile = useSelector((state) => state.ProfileFetchReducer);

  useEffect(() => {
    if (profile && profile.status === 'success') {
      dispatch(isAuthenticated(true));
      dispatch(userAction(profile.APIData[0]));
    }
  });
  if (screenChange)
    return (
      <Grid container>
        {profile.status === 'loading' ? (
          <CircularLoader />
        ) : (
          <>
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
          </>
        )}
      </Grid>
    );
  else
    return (
      <div className='mainTweet' style={{ width: '90vw' }}>
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
