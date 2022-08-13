import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/system';
import '../Utility/TweetHomeStyle.css';
import TWUser from '../UtilityComponent/TWUser';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  txtLight: {
    color: theme.palette.text.primary,
  },
}));
function WhatsHappening() {
  const classes = useStyles();
  return (
    <div className='hpRoot'>
      <Stack direction='column'>
        <div className='searchContainer'>
          <SearchBar />
        </div>
        <div className='twcss1'>
          <Typography
            variant='h3'
            fontSize='2rem'
            fontWeight='600'
            className='twTextHapen'
          >
            Peoples around you
          </Typography>
        </div>
        <div className='hapnCont'>
          <TWUser name='Kousik Sen' isActive='true' username='kousiksen6' />
          <TWUser name='Debashree' isActive='false' username='Debo97' />
          <TWUser name='Cognizant' username='cts' />
          <TWUser name='Cognizant' username='cts' />
          <TWUser name='Cognizant' username='cts' />
          <TWUser name='Tor Matha' username='tormatha' />
          <TWUser name='Sexy' username='sexy' />
          <TWUser name='Kousik Sen' username='kousiksen6' />
          <TWUser name='Kousik Sen' username='kousiksen6' />
        </div>
      </Stack>
    </div>
  );
}

export default WhatsHappening;
