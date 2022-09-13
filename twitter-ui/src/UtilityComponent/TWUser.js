import { Avatar, Badge, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Verified } from "@mui/icons-material";
import { Stack } from "@mui/system";
import "../Utility/TweetHomeStyle.css";

const useStyles = makeStyles((theme) => ({
  txtLight: {
    color: theme.palette.text.disabled,
  },
  followBtn: {
    height: "7vh",
    width: "7vw",
    borderRadius: "3vw",
    fontSize: "1rem",
  },
}));
function TWUser(props) {
  const classes = useStyles();
  return (
    <div className="userRoot">
      <Stack direction="row" spacing={1}>
        <Badge color={props.isActive ? "success" : "warning"} variant="dot">
          <Avatar
            className="avatarDiv"
            alt="profile"
            src={`https://tweetappimages.blob.core.windows.net/tweetappimages/${props.image}`}
          />
        </Badge>
        <div className="username">
          <Stack direction="row" spacing={1}>
            <div className="nameDiv">
              <Typography variant="h3" fontSize="1.2rem">
                {props.name}
              </Typography>
            </div>
            <Verified fontSize="1rem" />
          </Stack>
          <Typography
            variant="h5"
            fontSize="1rem"
            sx={{ float: "left" }}
            className={classes.txtLight}
          >
            @ {props.username}
          </Typography>
        </div>

        {/* <div className='btnDiv'>
          <button variant='contained' className={classes.followBtn}>
            Follow
          </button>
        </div> */}
      </Stack>
    </div>
  );
}

export default TWUser;
