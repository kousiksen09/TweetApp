import { Verified } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { Card, Avatar, Typography, CardContent, Button } from "@mui/material";
import { Stack } from "@mui/system";
import "./utility.css";
import { useState } from "react";
import { likeFetchInitiated } from "../Redux/Action/LikeAction";

function TweetCard(props) {
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const [count, setCount] = useState(parseInt(props.reactionCount));
  const handleLikeClick = (event) => {
    setLike((like) => !like);
    const Payload = {
      token: localStorage.getItem("token"),
      Id: props.tweetId,
    };
    dispatch(likeFetchInitiated(Payload));
    setCount(count + 1);
  };
  //const likeCount = useSelector((state)=> state.likeReducer);
  return (
    <Card variant="outlined" sx={{ width: "100%", backgroundColor: "#1b2735" }}>
      <Stack direction="row" spacing={1}>
        <div className="userImage">
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt="profile"
            src={`https://tweetappimages.blob.core.windows.net/tweetappimages/${props.profilePic}`}
          />
        </div>
        <div className="mainPost">
          <Stack direction="row" spacing={1}>
            <Typography fontSize="1.2rem" fontWeight="500">
              {props.Name}
            </Typography>
            <Verified fontSize="1rem" />
            <Typography
              fontSize="1.2rem"
              fontWeight="400"
              sx={{ color: "GrayText" }}
            >
              {props.userName}
            </Typography>
            <FiberManualRecordIcon
              sx={{
                color: "GrayText",
                fontSize: "1rem",
                position: "relative",
                top: "1vh",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                color: "GrayText",
                fontSize: "1rem",
                position: "relative",
                top: "1vh",
              }}
            >
              {props.postAgo}
            </Typography>
          </Stack>
        </div>
      </Stack>
      <div className="tweetContent">
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {props.caption}
          </Typography>
        </CardContent>
        {props.postImg !== null ? 

        <div className="imgCont">
          <img
            src={`https://tweetappimages.blob.core.windows.net/tweetappimages/${props.postImg}`}
            className="postImg"
            alt={props.caption}
          />
        </div> : ""
        }

        <div className="reactionCont">
          <Stack direction="row" spacing={3}>
            <Button onClick={handleLikeClick}>
              {like ? (
                <FavoriteIcon
                  sx={{ height: 20, width: 20, color: "rgb(29, 155, 240)" }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon sx={{ height: 20, width: 20 }} />
              )}
              <Typography
                fontSize="1.2rem"
                fontWeight="700"
                sx={{ marginLeft: 2 }}
              >
                {count}
              </Typography>
            </Button>
            <Button onClick={props.replyFn}>
              <CommentOutlinedIcon sx={{ height: 20, width: 20 }} />
            </Button>
          </Stack>
        </div>
      </div>
    </Card>
  );
}

export default TweetCard;
