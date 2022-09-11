import '../Utility/TweetHomeStyle.css';
import { IconButton, Stack, Avatar, Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector } from 'react-redux';
import '../Utility/TweetHomeStyle.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    position: 'relative',
    margin: '2rem',
    top: '4vh',
  },
  badge: {
    padding: 0,
    marginRight: '1vw',
  },
}));
function LeftNavBar() {
  const classes = useStyles();

  const profileUser = useSelector((state) => state.userReducer);

  const username = profileUser.isAuthenticated && profileUser.user.userName;
  return (
    <header className='root'>
      <div className='iconContainer'>
        <Stack direction='column' justifyContent='center' spacing={2}>
          <Link to='/feed'>
            <IconButton
              classes={{ root: classes.iconBtn }}
              aria-label='Tweet'
              component='label'
            >
              <TwitterIcon className='MuiButtonBase-root MuiIconButton-root' />
            </IconButton>
          </Link>
          <Link to='/feed'>
            <IconButton
              classes={{ root: classes.iconBtn }}
              aria-label='Tweet'
              component='label'
            >
              <HomeIcon className='MuiButtonBase-root MuiIconButton-root' />
            </IconButton>
          </Link>
          <Link to='/'>
            <IconButton
              classes={{ root: classes.iconBtn }}
              aria-label='Tweet'
              component='label'
            >
              <TagIcon className='MuiButtonBase-root MuiIconButton-root' />
            </IconButton>
          </Link>
          <Link to='/'>
            <IconButton
              classes={{ root: classes.iconBtn }}
              aria-label='Tweet'
              component='label'
            >
              <Badge
                badgeContent={3}
                color='error'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                className={classes.badge}
              >
                <NotificationsIcon className='MuiButtonBase-root MuiIconButton-root' />
              </Badge>
            </IconButton>
          </Link>
        </Stack>

        <div className='profileAvatar'>
          <Link to={`../profile/${username}`}>
            <Avatar
              sx={{ width: 50, height: 50 }}
              src={profileUser.user && profileUser.user.profilePicture}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
export default LeftNavBar;
