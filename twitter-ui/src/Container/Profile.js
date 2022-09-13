/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Grid, Skeleton, Typography } from "@mui/material";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LeftNavBar from "../Component/LeftNavBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WhatsHappening from "../Component/WhatsHappening";
import { profileapiFetchInitiated } from "../Redux/Action/ProfileFetch";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
//import { userApiImage } from '../Utility/ImagePath';
import "../Utility/TweetHomeStyle.css";
import TabPanel from "../UtilityComponent/TabPannel";
import { getMyTweetsapiFetchInitiated } from "../Redux/Action/GetMyTweetAction";
import TweetCard from "../UtilityComponent/TweetCard";
import ReplyCard from "../Component/ReplyCard";
import CircularLoader from "../Utility/HelperComponent/CircularLoader";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Profile(props) {
  const params = useParams();
  const dispatch = useDispatch();
  //console.log(userApiImage);
  useEffect(() => {
    const payload = {
      token: localStorage.getItem("token"),
      id: params.id,
    };
    dispatch(profileapiFetchInitiated(payload));
  }, [params.id, dispatch]);
  const profile = useSelector((state) => state.ProfileFetchReducer);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (profile.status === "success") {
      const payload = {
        token: localStorage.getItem("token"),
        id: profile.APIData[0].id,
      };
      dispatch(getMyTweetsapiFetchInitiated(payload));
    }
  }, [profile.status === "success"]);
  const tweetStatus = useSelector((state) => state.GetMyTweetsReducer.status);

  const tweetReducer = useSelector(
    (state) => state.GetMyTweetsReducer.APIData[0]
  );
  const allTweet = tweetReducer && tweetReducer.result;
  return (
    <Grid container>
      {profile.status === "loading" || tweetStatus.status === "loading" ? (
        <CircularLoader />
      ) : (
        <>
          <LeftNavBar />
          <WhatsHappening />
          {profile.status === "success" && (
            <div className="mainTweet">
              <div className="coverPhoto" />
              <div className="profileAvatarss">
                <Avatar
                  sx={{ width: 120, height: 120 }}
                  alt="profile"
                  src={`https://tweetappimages.blob.core.windows.net/tweetappimages/${profile.APIData[0].profilePicture}`}
                />
              </div>
              <div className="profileDetails1">
                <div className="profileInfo">
                  <Typography variant="h3" fontSize="1.8rem">
                    {profile.APIData[0].name}
                  </Typography>
                  <Typography variant="h4" fontSize="1.3rem" top="1vh">
                    @ {profile.APIData[0].userName}
                  </Typography>
                </div>
                <div className="addressInfo">
                  <Typography
                    variant="h3"
                    color="rgb(113, 118, 123)"
                    fontSize="1.4rem"
                  >
                    <LocationOnOutlinedIcon />
                    {profile.APIData[0].state}
                  </Typography>
                  <Typography
                    color="rgb(113, 118, 123)"
                    variant="h4"
                    fontSize="1rem"
                    top="1vh"
                  >
                    <CallOutlinedIcon sx={{ marginRight: "1vw" }} />
                    {profile.APIData[0].mobileNumber}
                  </Typography>
                </div>
              </div>
              <div className="replyArea">
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderColor: "rgb(249, 24, 128)" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="secondary"
                      aria-label="tweets"
                    >
                      <Tab
                        sx={{ fontSize: "1.3rem" }}
                        label="Tweets"
                        {...a11yProps(0)}
                      />
                      <Tab
                        sx={{ fontSize: "1.3rem" }}
                        label="Tweets & Replies"
                        {...a11yProps(1)}
                      />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                      <div className="scrollableDiv">
                        {tweetStatus === "loading" && (
                          <>
                            <Skeleton
                              animation="wave"
                              variant="circular"
                              width={40}
                              height={40}
                            />
                            <Skeleton
                              animation="wave"
                              height={10}
                              width="80%"
                              style={{ marginBottom: 6 }}
                            />
                            <Skeleton
                              animation="wave"
                              height={10}
                              width="40%"
                            />
                            <Skeleton
                              sx={{ height: 190 }}
                              animation="wave"
                              variant="rectangular"
                            />
                            <Skeleton
                              animation="wave"
                              height={10}
                              style={{ marginBottom: 6 }}
                            />
                            <Skeleton
                              animation="wave"
                              height={10}
                              width="80%"
                            />
                          </>
                        )}
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
                        {profile.status === "success" &&
                          tweetStatus === "success" &&
                          allTweet &&
                          allTweet.map((tweet, id) => (
                            <>
                              <TweetCard
                                profilePic={profile.APIData[0].profilePicture}
                                Name={profile.APIData[0].name}
                                userName={profile.APIData[0].userName}
                                caption={tweet.caption}
                                postAgo="6h"
                                reactionCount={tweet.like}
                                postImg={tweet.image}
                                tweetId={tweet.tweetID}
                              />
                              <ReplyCard
                                profilePic={profile.APIData[0].profilePicture}
                                Name={profile.APIData[0].name}
                                userName={profile.APIData[0].userName}
                                tweetId={tweet.tweetID}
                              />
                            </>
                          ))}
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <div className="scrollableDiv">
                        {tweetStatus === "loading" && (
                          <>
                            <Skeleton
                              animation="wave"
                              variant="circular"
                              width={40}
                              height={40}
                            />
                            <Skeleton
                              animation="wave"
                              height={10}
                              width="80%"
                              style={{ marginBottom: 6 }}
                            />
                            <Skeleton
                              animation="wave"
                              height={10}
                              width="40%"
                            />
                            <Skeleton
                              sx={{ height: 190 }}
                              animation="wave"
                              variant="rectangular"
                            />
                            <Skeleton
                              animation="wave"
                              height={10}
                              style={{ marginBottom: 6 }}
                            />
                            <Skeleton
                              animation="wave"
                              height={10}
                              width="80%"
                            />
                          </>
                        )}
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
                        {profile.status === "success" &&
                          tweetStatus === "success" &&
                          allTweet &&
                          allTweet.map((tweet, id) => (
                            <>
                              <TweetCard
                                profilePic={profile.APIData[0].profilePicture}
                                Name={profile.APIData[0].name}
                                userName={profile.APIData[0].userName}
                                caption={tweet.caption}
                                postAgo="6h"
                                reactionCount={tweet.like}
                                postImg={tweet.image}
                                tweetId={tweet.tweetID}
                              />
                              <ReplyCard
                                profilePic={profile.APIData[0].profilePicture}
                                Name={profile.APIData[0].name}
                                userName={profile.APIData[0].userName}
                                tweetId={tweet.tweetID}
                              />
                            </>
                          ))}
                      </div>
                    </TabPanel>
                  </Box>
                </Box>
              </div>
            </div>
          )}
        </>
      )}
    </Grid>
  );
}

export default Profile;
