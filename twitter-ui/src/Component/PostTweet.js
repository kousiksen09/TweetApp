import { Avatar, IconButton, Input, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import '../Utility/TweetHomeStyle.css';

function PostTweet(props) {
  return (
    <div className='postRoot'>
      <Typography
        variant='h2'
        fontSize='1.5rem'
        sx={{ marginBottom: 1 }}
        fontWeight='600'
      >
        Home
      </Typography>
      <div className='typeTweet'>
        <Stack direction='row' spacing={2}>
          <Avatar
            sx={{ width: 46, height: 46 }}
            alt='profile'
            src={props.profilePic}
          />
          <Input
            className='twwetPlace'
            variant='standard'
            placeholder='Whats Happening?'
          />
        </Stack>
      </div>
      <div className='iconMnger'>
        <Stack direction='row' spacing={1}>
          <IconButton aria-label='image'>
            <ImageOutlinedIcon className='iconsStack' />
          </IconButton>
          <IconButton aria-label='image'>
            <GifBoxOutlinedIcon className='iconsStack' />
          </IconButton>
          <IconButton aria-label='image'>
            <SentimentSatisfiedOutlinedIcon className='iconsStack' />
          </IconButton>
          <div className='postbtnDiv'>
            <button className='postButton'>Tweet</button>
          </div>
        </Stack>
      </div>
    </div>
  );
}

export default PostTweet;
