import LeftNavBar from '../Component/LeftNavBar';
//import { useTheme } from '@emotion/react';
import {Grid,Stack,Avatar,Typography} from '@mui/material';
import WhatsHappening from '../Component/WhatsHappening';
import '../Utility/TweetHomeStyle.css';
//import PostTweet from '../Component/PostTweet';
//import TweetCard from '../UtilityComponent/TweetCard';
//import { Verified } from '@mui/icons-material';
import Tabs from '../Component/Tabs';


export default function profile() {
  //const classes = useStyles();
      return (
        <Grid container>
          <LeftNavBar />
          <WhatsHappening />
          <div className= 'profileMain'>           
              <div className='imgCont' width = '100%'>
                   <img alt ="cover photo" src={"https://thumbs.dreamstime.com/b/beautifull-cenary-world-very-beautiful-enjoy-world-59442546.jpg"} className='coverImg'  />
              </div>
              <div className='profilePhoto'>
              <div className ='profileImg'>
                <Stack direction='column'>
                    <Avatar src="https://static.vecteezy.com/system/resources/previews/002/947/531/original/cute-and-beautiful-anime-girls-with-cat-vector.jpg" sx={{ width: 180, height: 180 }} />
                        <Typography fontSize='1.8rem' fontWeight='500'>
                            {"Debasree Chowdhury"}
                        </Typography>
                        <Typography
                            fontSize='1.2rem'
                            fontWeight='400'
                            //className={classes.txtLight}
                            sx={{
                              color: 'GrayText',
                              fontSize: '1.2rem',
                            position: 'inherit'}}
                          >
                             {"@Deb097"}
                        </Typography>
                        <Typography
                            variant='h4'
                            sx={{
                              color: 'GrayText',
                              fontSize: '1.2rem',
                              
                              top: '1vh',
                            }}
                          >
                             {"Joined at sept 2022"}
                         </Typography>
                         <div className='Tabs'>
                            <Tabs></Tabs>
                         </div>
                   </Stack>  
                 </div>
                 </div>
                 </div>
            </Grid>
   );
}