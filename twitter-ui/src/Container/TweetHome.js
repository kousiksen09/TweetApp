/* eslint-disable react-hooks/exhaustive-deps */
import LeftNavBar from '../Component/LeftNavBar';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, useMediaQuery, Typography } from '@mui/material';
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
import swal from 'sweetalert';
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";


export default function TweetHome() {
  const theme = useTheme();
  const screenChange = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();
  //const tweetPost = useSelector((state) => state.TweetPostReducer);

  useEffect(() => {
    const payload = {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('userName'),
    };
    if (payload.id !== null && payload.token !== null)
      dispatch(profileapiFetchInitiated(payload));
    dispatch(getAllUserapiFetchInitiated(payload));
    dispatch(getAllTweetsapiFetchInitiated(payload));
  }, []);

  const profile = useSelector((state) => state.ProfileFetchReducer);
  const tweetStatus = useSelector((state) => state.GetAllTweetsReducer.status);
  const tweetReducer = useSelector(
    (state) => state.GetAllTweetsReducer.APIData[0]
  );
  const all_Tweet = tweetReducer && tweetReducer.result;
  const allTweet = all_Tweet && [].concat(all_Tweet).reverse();
  const userList = useSelector((state) => state.GetAllUserReducer.APIData[0]);
  const userApiStts = useSelector((state) => state.GetAllUserReducer.status);
  //const isAuth = localStorage.getItem('authenticated');
  const tweetPostSTTS = useSelector((state) => state.TweetPostReducer.status);


  useEffect(() => {
    if (profile && profile.status === 'success') {
      dispatch(isAuthenticated(true));
      dispatch(userAction(profile.APIData[0]));
    }
  });

  // useEffect(() => {
  //   const payload = {
  //     token: localStorage.getItem('token'),
  //     id: localStorage.getItem('userName'),
  //   };
  //   if(tweetPostSTTS === "success"){
  //   dispatch(getAllTweetsapiFetchInitiated(payload));
  //   }
    
  // }, []);

  useEffect(() => {
    if(tweetPostSTTS === 'Error')  {  
      swal({
        title: "Please provide a image",
        icon: 'error',
      });}
  }, [tweetPostSTTS === 'Error']);

  if (screenChange)
    return (
      <Grid container>
        { profile.status === 'loading' ? (
          <CircularLoader />
        ) : (
          <>
            <LeftNavBar />

            <WhatsHappening />

            <div className='mainTweet'>
              <PostTweet
                profilePic={
                  profile &&
                  profile.status === 'success' &&
                  profile.APIData[0].profilePicture
                }
              />
              {tweetStatus === "Error" && (
                          <>
                            <div style={{ width: "100px", margin: "auto" }}>
                              <SentimentVeryDissatisfiedIcon
                                sx={{
                                  height: "100px",
                                  width: "100px",
                                  color: "GrayText",
                                }}
                              />
                            </div>
                            <Typography
                              sx={{ color: "GrayText", textAlign: "center" }}
                              variant="h4"
                              textAlign="center"
                              fontSize="1.9rem"
                            >
                              Hmm!! Looks like there are no Tweets!!
                            </Typography>
                          </>
                        )}
              {tweetStatus === 'loading' ? (
                <>
                  <Skeleton
                    animation='wave'
                    variant='circular'
                    width={40}
                    height={40}
                  />
                  <Skeleton
                    animation='wave'
                    height={10}
                    width='80%'
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation='wave' height={10} width='40%' />
                  <Skeleton
                    sx={{ height: 190 }}
                    animation='wave'
                    variant='rectangular'
                  />
                  <Skeleton
                    animation='wave'
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation='wave' height={10} width='80%' />
                </>
              ) : (
                <div className='tweetFeed'>
                  {userApiStts === 'success' &&
                    tweetStatus === 'success' &&
                    allTweet &&
                    allTweet.map((tweet, id) => (
                      <TweetCard
                        profilePic={
                          userList.find((a) => a.id === tweet.userId)
                            .profilePicture
                        }
                        Name={userList.find((a) => a.id === tweet.userId).name}
                        userName={
                          userList.find((a) => a.id === tweet.userId).userName
                        }
                        caption={tweet.caption}
                        //postAgo='6h'
                        reactionCount={tweet.like}
                        postImg={tweet.image}
                        tweetId={tweet.tweetID}
                      />
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </Grid>
    );
  else
    return (
      <div className='mainTweet'>
        <PostTweet profilePic={profile.profilePicture} />
        <div className='tweetFeed'>
          {userApiStts === 'success' &&
            tweetStatus === 'success' &&
            allTweet &&
            allTweet.map((tweet, id) => (
              <TweetCard
                profilePic={
                  userList.find((a) => a.id === tweet.userId).profilePicture
                }
                Name={userList.find((a) => a.id === tweet.userId).name}
                userName={userList.find((a) => a.id === tweet.userId).userName}
                caption={tweet.caption}
                //postAgo='6h'
                reactionCount={tweet.like}
                postImg={tweet.image}
                tweetId={tweet.tweetID}
              />
            ))}
        </div>
      </div>
    );
}
