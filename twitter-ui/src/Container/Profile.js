import { Avatar, Grid } from '@mui/material';
import LeftNavBar from '../Component/LeftNavBar';
import WhatsHappening from '../Component/WhatsHappening';
import '../Utility/TweetHomeStyle.css';

function Profile(props) {
  return (
    <Grid container>
      <LeftNavBar />
      <WhatsHappening />

      <div className='mainTweet'>
        <div className='coverPhoto' />
        <div className='profileAvatarss'>
          <Avatar
            sx={{ width: 120, height: 120 }}
            alt='profile'
            src={props.profilePic}
          />
        </div>
        <div className='profileDetails1'></div>
      </div>
    </Grid>
  );
}

export default Profile;
