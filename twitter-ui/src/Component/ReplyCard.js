import { Typography, Stack, Avatar } from '@mui/material';
import { Verified } from '@mui/icons-material';

function ReplyCard(props) {
  return (
    <div className='replyHome'>
      <div className='content'>
        <Stack direction='row' spacing={1}>
          <div className='userImage'>
            <Avatar
              sx={{ width: 40, height: 40 }}
              alt='profile'
              src={props.profilePic}
            />
          </div>
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
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default ReplyCard;
