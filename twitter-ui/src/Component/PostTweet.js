import { Avatar, IconButton, Input, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import "../Utility/TweetHomeStyle.css";
import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { tweetpostapiFetchInitiated } from "../Redux/Action/TweetPostAPIAction";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { uploadfIle } from "../Utility/HelperFunctions/FileUpload";

function PostTweet(props) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [isEmojiSildeOn, setIsEmojiSlideOn] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [imageName, setImageName] = useState("");
  const dispatch = useDispatch();
  const imageRef = useRef();
  const emojiIconClick = (event) => {
    setIsEmojiSlideOn((current) => !current);
  };
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  const postImage = (event) => {
    console.log(event.target.files[0].name);

    if (event.target.files && event.target.files[0]) {
      let imagefile = event.target.files[0];
      setImageName(imagefile.name);
      setImage(imagefile);
      imageRef.imagepost = imagefile;
    }
  };
  const captionHandler = (event) => {
    setCaption(event.target.value);
  };
  const profileUser = useSelector((state) => state.userReducer);

  const submitHandler = (event) => {
    event.preventDefault();
    const payload = {
      token: localStorage.getItem("token"),
      Id: profileUser.isAuthenticated && profileUser.user.id,
      Caption: caption,
      Image: image,
    };
    dispatch(tweetpostapiFetchInitiated(payload));
    setImage(null);
    setCaption("");
    setImageName("");
  };
  const tweetPostSTTS = useSelector((state) => state.TweetPostReducer.status);
  const tweetPostReducer = useSelector(
    (state) => state.TweetPostReducer.APIData[0]
  );
  useEffect(() => {
    if (tweetPostSTTS === "success") {
            
      uploadfIle(
        imageRef.imagepost,
        tweetPostReducer && tweetPostReducer.result.image
      );
    }
  }, [tweetPostSTTS === "success"]);

  return (
    <div className="postRoot">
      <Typography
        variant="h2"
        fontSize="1.5rem"
        sx={{ marginBottom: 1 }}
        fontWeight="600"
      >
        Home
      </Typography>
      <form onSubmit={submitHandler}>
        <div className="typeTweet">
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{ width: 46, height: 46 }}
              alt="profile"
              src={`https://tweetappimages.blob.core.windows.net/tweetappimages/${props.profilePic}`}
            />

            <Input
              className="twwetPlace"
              variant="standard"
              placeholder="Whats Happening?"
              onChange={captionHandler}
              value={caption}
            />
          </Stack>
        </div>
        <div className="iconMnger">
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="upload picture" component="label">
              <input
                hidden
                type="file"
                accept="image/*"
                className="form-contol-file"
                onChange={postImage}
              />
              <ImageOutlinedIcon className="iconsStack" />
            </IconButton>
            <IconButton aria-label="image">
              <GifBoxOutlinedIcon className="iconsStack" />
            </IconButton>
            <IconButton onClick={emojiIconClick} aria-label="image">
              <SentimentSatisfiedOutlinedIcon className="iconsStack" />
            </IconButton>
            <Typography
              variant="h4"
              fontSize="1.4rem"
              color="#a074b3"
              sx={{ zIndex: 100 }}
            >
              {imageName}
            </Typography>
            <div className="postbtnDiv">
              {tweetPostSTTS === "loading" ? (
                <LoadingButton loading variant="outlined">
                  Submit
                </LoadingButton>
              ) : (
                <button type="submit" className="postButton">
                  Tweet
                </button>
              )}
            </div>
          </Stack>
        </div>
        {isEmojiSildeOn && (
          <div className="emojiDix">
            <Picker
              onEmojiClick={onEmojiClick}
              disableSkinTonePicker="true"
              disableSearchBar="true"
              pickerStyle={{
                background:
                  "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)",
              }}
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default PostTweet;
