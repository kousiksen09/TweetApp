/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Stack, Avatar, Input } from "@mui/material";
import { Verified } from "@mui/icons-material";
import "../Utility/TweetHomeStyle.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReplyapiFetchInitiated } from "../Redux/Action/GetReplyAction";
import CircularLoader from "../Utility/HelperComponent/CircularLoader";
import { tweetreplyInitiated } from "../Redux/Action/TweetReplyAction";
import { LoadingButton } from "@mui/lab";

function ReplyCard(props) {
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const captionHandler = (event) => {
    setCaption(event.target.value);
  };

  const replyReducer = useSelector((state) => state.GetReplyReducer);
  const bol = useSelector((state) => state.GetReplyReducer.APIData[0]);
  const oldReply = bol && bol.result;

  const user = useSelector((state) => state.userReducer.user);
  const submitHandler = (event) => {
    event.preventDefault();
    const payload = {
      reply: caption,
      tweetId: props.tweetId,
      Id: user && user.id,
    };
    dispatch(tweetreplyInitiated(payload));
    setCaption("");
  };
  const userList = useSelector((state) => state.GetAllUserReducer.APIData[0]);
  const userApiStts = useSelector((state) => state.GetAllUserReducer.status);
  const tweetReplyReducer = useSelector(
    (state) => state.TweetReplyReducer.status
  );
  useEffect(() => {
    const payload = {
      token: localStorage.getItem("token"),
      tweetId: props.tweetId,
    };
    dispatch(getReplyapiFetchInitiated(payload));
  }, [tweetReplyReducer === "success"]);
  return (
    <div className="replyHome">
      {replyReducer.status === "loading" || userApiStts === "loading" ? (
        <CircularLoader />
      ) : (
        <div className="content">
          {replyReducer.status === "Error" ? (
            <Typography
              sx={{ color: "GrayText", textAlign: "center" }}
              variant="h4"
              textAlign="center"
              fontSize="1.2rem"
            >
              No Reply is there!!
            </Typography>
          ) : (
            <div>
              {userList &&
                oldReply &&
                oldReply.map((reply, id) => (
                  <>
                    <Stack direction="row" spacing={1}>
                      <div className="userImage">
                        <Avatar
                          sx={{ width: 40, height: 40 }}
                          alt="profile"
                          src={`https://tweetappimages.blob.core.windows.net/tweetappimages/${
                            userList.find((a) => a.id === reply.replyUserId)
                              .profilePicture
                          }`}
                        />
                      </div>
                      <Stack
                        direction="row"
                        sx={{ paddingTop: "1.3vh" }}
                        spacing={2}
                      >
                        <Typography fontSize="1.2rem" fontWeight="500">
                          {
                            userList.find((a) => a.id === reply.replyUserId)
                              .name
                          }
                        </Typography>
                        <Verified fontSize="1rem" />
                        <Typography
                          fontSize="1.2rem"
                          fontWeight="400"
                          sx={{ color: "GrayText" }}
                        >
                          {
                            userList.find((a) => a.id === reply.replyUserId)
                              .userName
                          }
                        </Typography>
                        <Typography
                          sx={{
                            position: "absolute",
                            right: "2vw",
                          }}
                          fontSize="1.2rem"
                        >
                          {reply.replyPostedOn}
                        </Typography>
                      </Stack>
                    </Stack>
                    <div className="prevCommment">
                      <Typography variant="h4" fontSize="1.2rem">
                        {reply.replyTweetBody}
                      </Typography>
                    </div>
                  </>
                ))}
            </div>
          )}
          <div className="commentSection">
            <form onSubmit={submitHandler}>
              <div className="newComment">
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{ width: 46, height: 46 }}
                    alt="profile"
                    src={`https://tweetappimages.blob.core.windows.net/tweetappimages/${user && user.profilePicture}`}
                  />

                  <Input
                    className="twwetPlace"
                    variant="standard"
                    placeholder="Whats Happening?"
                    onChange={captionHandler}
                    value={caption}
                  />
                </Stack>
                <div className="postbtnDiv">
                  {tweetReplyReducer === "loading" ? (
                    <LoadingButton loading variant="outlined">
                      Submit
                    </LoadingButton>
                  ) : (
                    <button type="submit" className="postButton">
                      Reply
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReplyCard;
