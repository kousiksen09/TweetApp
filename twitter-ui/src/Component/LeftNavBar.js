import "../Utility/TweetHomeStyle.css";
import { IconButton, Stack, Avatar, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import "../Utility/TweetHomeStyle.css";
import { Link, useNavigate } from "react-router-dom";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    position: "relative",
    margin: "2rem",
    top: "4vh",
  },
  badge: {
    padding: 0,
    marginRight: "1vw",
  },
}));
function LeftNavBar() {
  const classes = useStyles();
  let navigate = useNavigate();
  const profileUser = useSelector((state) => state.userReducer);

  const username = profileUser.isAuthenticated && profileUser.user.userName;
  const logOut = () => {
    localStorage.setItem('authenticated', false);
    localStorage.removeItem('token');
    localStorage.clear();    
    if(!(localStorage.getItem('authenticated'))){
    navigate("/", { replace: true });}
  };
  return (
    <header className="root">
      <div className="iconContainer">
        <Stack direction="column" justifyContent="center" spacing={2}>
          <Link to="/">
            <IconButton
              classes={{ root: classes.iconBtn }}
              aria-label="Tweet"
              component="label"
            >
              <TwitterIcon className="MuiButtonBase-root MuiIconButton-root" />
            </IconButton>
          </Link>
          <Link to="/">
            <IconButton
              classes={{ root: classes.iconBtn }}
              aria-label="Tweet"
              component="label"
            >
              <HomeIcon className="MuiButtonBase-root MuiIconButton-root" />
            </IconButton>
          </Link>
          <Link to="/feed">
            <IconButton
              classes={{ root: classes.iconBtn }}
              aria-label="Tweet"
              component="label"
            >
              <TagIcon className="MuiButtonBase-root MuiIconButton-root" />
            </IconButton>
          </Link>
          <Link to="/feed">
            <IconButton
              classes={{ root: classes.iconBtn }}
              aria-label="Tweet"
              component="label"
            >
              <Badge
                badgeContent={3}
                color="error"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                className={classes.badge}
              >
                <NotificationsIcon className="MuiButtonBase-root MuiIconButton-root" />
              </Badge>
            </IconButton>
          </Link>
        </Stack>

        <div className="profileAvatar">
          <Stack justifyContent="center" spacing={2} direction="column">
            <IconButton
              classes={{ root: classes.iconBtn }}
              aria-label="Tweet"
              component="label"
              sx={{ paddingBottom: "5vh" }}
              onClick={logOut}
            >
              <LogoutIcon className="MuiButtonBase-root MuiIconButton-root" />
            </IconButton>
            <Link to={`../profile/${username}`}>
              <Avatar
                sx={{ width: 50, height: 50 }}
                src={`https://tweetappimages.blob.core.windows.net/tweetappimages/${
                  profileUser.user && profileUser.user.profilePicture
                }`}
              />
            </Link>
          </Stack>
        </div>
      </div>
    </header>
  );
}
export default LeftNavBar;
