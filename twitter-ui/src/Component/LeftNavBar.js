import '../Utility/TweetHomeStyle.css';
import { IconButton, Stack, Avatar, Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KSEN from '../Utility/image/KSEN.png';
import '../Utility/TweetHomeStyle.css';

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

  return (
    <header className='root'>
      <div className='iconContainer'>
        <Stack direction='column' justifyContent='center' spacing={2}>
          <IconButton
            classes={{ root: classes.iconBtn }}
            aria-label='Tweet'
            component='label'
          >
            <TwitterIcon className='MuiButtonBase-root MuiIconButton-root' />
          </IconButton>
          <IconButton
            classes={{ root: classes.iconBtn }}
            aria-label='Tweet'
            component='label'
          >
            <HomeIcon className='MuiButtonBase-root MuiIconButton-root' />
          </IconButton>
          <IconButton
            classes={{ root: classes.iconBtn }}
            aria-label='Tweet'
            component='label'
          >
            <TagIcon className='MuiButtonBase-root MuiIconButton-root' />
          </IconButton>
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
        </Stack>
        <div className='profileAvatar'>
          <Avatar alt='profile' src={KSEN} />
        </div>
      </div>
    </header>
  );
}
export default LeftNavBar;
