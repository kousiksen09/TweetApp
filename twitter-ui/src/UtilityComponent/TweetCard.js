import { Verified } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import {
  Card,
  Avatar,
  Typography,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import { Stack } from '@mui/system';
import './utility.css';
import { useState } from 'react';

function TweetCard(props) {
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(parseInt(props.reactionCount));
  const handleLikeClick = (event) => {
    setLike((like) => !like);
    console.log(like);

    if (like) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <Card variant='outlined' sx={{ width: '100%', backgroundColor: '#1b2735' }}>
      <Stack direction='row' spacing={1}>
        <div className='userImage'>
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt='profile'
            src={props.profilePic}
          />
        </div>
        <div className='mainPost'>
          <Stack direction='row' spacing={1}>
            <Typography fontSize='1.2rem' fontWeight='500'>
              {props.Name}
            </Typography>
            <Verified fontSize='1rem' />
            <Typography
              fontSize='1.2rem'
              fontWeight='400'
              sx={{ color: 'GrayText' }}
            >
              {props.userName}
            </Typography>
            <FiberManualRecordIcon
              sx={{
                color: 'GrayText',
                fontSize: '1rem',
                position: 'relative',
                top: '1vh',
              }}
            />
            <Typography
              variant='h4'
              sx={{
                color: 'GrayText',
                fontSize: '1rem',
                position: 'relative',
                top: '1vh',
              }}
            >
              {props.postAgo}
            </Typography>
          </Stack>
        </div>
      </Stack>
      <div className='tweetContent'>
        <CardContent>
          <Typography variant='body1' color='text.primary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>

        <div className='imgCont'>
          <img src={props.postImg} className='postImg' alt={props.caption} />
        </div>

        <div className='reactionCont'>
          <Stack direction='row' spacing={3}>
            <Button onClick={handleLikeClick}>
              {like ? (
                <FavoriteIcon
                  sx={{ height: 40, width: 40, color: 'rgb(29, 155, 240)' }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon sx={{ height: 40, width: 40 }} />
              )}
              <Typography
                fontSize='1.5rem'
                fontWeight='700'
                sx={{ marginLeft: 2 }}
              >
                {count}
              </Typography>
            </Button>
            <Button>
              <CommentOutlinedIcon sx={{ height: 40, width: 40 }} />
            </Button>
          </Stack>
        </div>
      </div>
    </Card>
  );
}

export default TweetCard;
