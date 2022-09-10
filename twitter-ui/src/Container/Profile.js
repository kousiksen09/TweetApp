import { Avatar, Grid, Typography } from '@mui/material';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LeftNavBar from '../Component/LeftNavBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import WhatsHappening from '../Component/WhatsHappening';
import { profileapiFetchInitiated } from '../Redux/Action/ProfileFetch';
//import { userApiImage } from '../Utility/ImagePath';
import '../Utility/TweetHomeStyle.css';
import TabPanel from '../UtilityComponent/TabPannel';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function Profile(props) {
  const params = useParams();
  const dispatch = useDispatch();
  //console.log(userApiImage);
  useEffect(() => {
    const payload = {
      token: localStorage.getItem('token'),
      id: params.id,
    };
    dispatch(profileapiFetchInitiated(payload));
  }, [params.id, dispatch]);
  const profile = useSelector((state) => state.ProfileFetchReducer);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <LeftNavBar />
      <WhatsHappening />
      {profile.status === 'success' && (
        <div className='mainTweet'>
          <div className='coverPhoto' />
          <div className='profileAvatarss'>
            <Avatar
              sx={{ width: 120, height: 120 }}
              alt='profile'
              src={profile.APIData[0].profilePicture}
            />
          </div>
          <div className='profileDetails1'>
            <div className='profileInfo'>
              <Typography variant='h3' fontSize='1.8rem'>
                {profile.APIData[0].name}
              </Typography>
              <Typography variant='h4' fontSize='1.3rem' top='1vh'>
                @ {profile.APIData[0].userName}
              </Typography>
            </div>
            <div className='addressInfo'>
              <Typography variant='h3' fontSize='1.4rem'>
                From - {profile.APIData[0].state}
              </Typography>
              <Typography variant='h4' fontSize='1rem' top='1vh'>
                <CallOutlinedIcon sx={{ marginRight: '1vw' }} />
                {profile.APIData[0].mobileNumber}
              </Typography>
            </div>
          </div>
          <div className='replyArea'>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ paddingLeft: '280px', borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab
                    sx={{ fontSize: '1.3rem' }}
                    label='Tweets'
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{ fontSize: '1.3rem' }}
                    label='Tweets & Replies'
                    {...a11yProps(1)}
                  />
                </Tabs>
                <TabPanel value={value} index={0}>
                  Tweet ache
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Tweet reply ache
                </TabPanel>
              </Box>
            </Box>
          </div>
        </div>
      )}
    </Grid>
  );
}

export default Profile;
