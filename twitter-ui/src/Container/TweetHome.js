import LeftNavBar from '../Component/LeftNavBar';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, useMediaQuery } from '@mui/material';
import WhatsHappening from '../Component/WhatsHappening';
import '../Utility/TweetHomeStyle.css';
import PostTweet from '../Component/PostTweet';
import TweetCard from '../UtilityComponent/TweetCard';
import { useEffect } from 'react';
import { profileapiFetchInitiated } from '../Redux/Action/ProfileFetch';
import { isAuthenticated, userAction } from '../Redux/Action/UserAction';
import CircularLoader from '../Utility/HelperComponent/CircularLoader';
import { getAllUserapiFetchInitiated } from '../Redux/Action/GetAllUserAction';
import { getAllTweetsapiFetchInitiated } from '../Redux/Action/GetAllTweetsAction';

export default function TweetHome() {
  const theme = useTheme();
  const screenChange = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();
  const tweetPost = useSelector((state) => state.TweetPostReducer);

  useEffect(() => {
    const payload = {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('userName'),
    };
    if (payload.id !== null && payload.token !== null)
      dispatch(profileapiFetchInitiated(payload));
    dispatch(getAllUserapiFetchInitiated(payload));
    dispatch(getAllTweetsapiFetchInitiated(payload));
  }, [dispatch, tweetPost]);
  const profile = useSelector((state) => state.ProfileFetchReducer);
  const tweetStatus = useSelector((state) => state.GetAllTweetsReducer.status);
  const tweetReducer = useSelector(
    (state) => state.GetAllTweetsReducer.APIData[0]
  );
  const allTweet = tweetReducer && tweetReducer.result;
  const userList = useSelector((state) => state.GetAllUserReducer.APIData[0]);
  const userApiStts = useSelector((state) => state.GetAllUserReducer.status);

  useEffect(() => {
    if (profile && profile.status === 'success') {
      dispatch(isAuthenticated(true));
      dispatch(userAction(profile.APIData[0]));
    }
  });
  if (screenChange)
    return (
      <Grid container>
        {profile.status === 'loading' || tweetStatus.status === 'loading' ? (
          <CircularLoader />
        ) : (
          <>
            <LeftNavBar />
            <WhatsHappening />

        
        <div className='mainTweet'>
          <PostTweet profilePic={profile && profile.status === 'success'&& profile.APIData[0].profilePicture}/>
          <div className='tweetFeed'>
          {userApiStts==='success' && tweetStatus === 'success' && 
          allTweet &&
          allTweet.map((tweet, id) => (
            <TweetCard
              profilePic={userList.find(a=> a.id === tweet.userId).profilePicture}
              Name = {userList.find(a=> a.id === tweet.userId).name}
              userName = {userList.find(a=> a.id === tweet.userId).userName}
              caption = {tweet.caption}
              //postAgo='6h'
              reactionCount= {tweet.like}
              postImg={tweet.image} 
              tweetId ={tweet.tweetID}                            
            />
           ))}
          </div>
        </div>
          </>
        )};
      </Grid>
    )
  else
    return (
      <div className='mainTweet'>
          <PostTweet profilePic={profile.profilePicture} />
          <div className='tweetFeed'>
          {userApiStts==='success' && tweetStatus === 'success' && 
          allTweet &&
          allTweet.map((tweet, id) => (
            <TweetCard
              profilePic={userList.find(a=> a.id === tweet.userId).profilePicture}              
              Name = {userList.find(a=> a.id === tweet.userId).name}
              userName = {userList.find(a=> a.id === tweet.userId).userName}
              caption = {tweet.caption}
              //postAgo='6h'
              reactionCount= {tweet.like}
              postImg={tweet.image} 
              tweetId ={tweet.tweetID}                            
            />
           ))}
          </div>
        </div>
    )
}
