TweetApp

TweetReplyCard.js

import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import PostReplyTweet from "../Component/PostReplyTweet";
import { repLyapiFetchInitiated } from "../Redux/Action/APIFetchAction";

const replydemo = [
  {
    replyId: 1,
    replystr: "India",
    replyPostName: "Debojyoti",
    replypostImg: "http://picsum.photos/200",
  },
  {
    replyId: 2,
    replystr: "Brazil",
    replyPostName: "DeepJyoti",
    replypostImg: "http://picsum.photos/200",
  },
];

export default function TweetReplyCard(props) {
  const dispatch = useDispatch();
  const [reply, setPostReply] = useState(replydemo);
  const replyPostHandler = (event, value) => {
    setPostReply((prevState) => {
      const newReply = {
        replyId: 3,
        replystr: value,
        replyUserId: "Dcmdlvmsdlmcdslmc",
        tweetId: 1,
      };
      dispatch(repLyapiFetchInitiated(newReply));
      return [...prevState, newReply];
    });
  };
  console.log(reply);

  return (
    <Box>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <Avatar
              sx={{ width: 65, height: 65 }}
              alt={props.item.Name}
              src={props.item.profilePic}
            />
          </Grid>
          <Grid item xs={8} justify="space-between">
            <Box
              display="flex"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="h5">
                  {props.item.Name} {props.item.userName}
                </Typography>
              </Box>
              <Box display="flex" alignItems="left">
                <Typography variant="h6">{props.item.postAgo}</Typography>
              </Box>
            </Box>
            <Divider sx={{ mu: 2, mb: 3 }} />
            <Typography variant="body1" color="text.primary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
            <img
              src={props.item.postImg}
              alt={props.caption}
              style={{ width: "80%", height: "60%" }}
            />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: 3 }}>
        <PostReplyTweet
          placeholder="Tweet your Reply"
          replypost={replyPostHandler}
        />
      </Box>
      <Box>
        <Divider sx={{ mb: 3 }} />
        {reply.map((items) => (
          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <Avatar
                sx={{ width: 50, height: 50 }}
                alt="Debojyoti"
                src="http://picsum.photos/200"
              />
            </Grid>
            <Grid item xs={8} justify="space-between">
              <Box
                display="flex"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box display="flex" alignItems="center">
                  <Typography variant="h6">
                    replied by {items.replyPostName}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="left">
                  <Typography variant="h6">3h</Typography>
                </Box>
              </Box>
              <Typography variant="body1" color="text.primary">
                {items.replystr}
              </Typography>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}

PostReplyTweet.js

import { Avatar, Grid, Input } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import "../Utility/TweetHomeStyle.css";

export default function PostReplyTweet(props) {
  const [postReply, setPostReplyValue] = useState("");
  const replyPostInputHandler = (event) => {
    setPostReplyValue(event.target.value);
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={1}></Grid>
      <Grid item xs={2}>
        <Avatar
          sx={{ width: 65, height: 65 }}
          alt="Debojyoti"
          src="http://picsum.photos/200"
        />
      </Grid>
      <Grid item xs={8} justify="space-between">
        <Box
          display="flex"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box display="flex" alignItems="center" sx={{ width: "80%" }}>
            <Input
              className="twwetPlace"
              variant="standard"
              placeholder={props.placeholder}
              value={postReply}
              onChange={replyPostInputHandler}
            />
          </Box>
          <Box display="flex" alignItems="left">
            <button
              className="postButton"
              onClick={(event) => props.replypost(event, postReply)}
            >
              Reply
            </button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

