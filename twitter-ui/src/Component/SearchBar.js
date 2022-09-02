import { Search } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/system';

import '../Utility/TweetHomeStyle.css';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));
function SearchBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Stack direction='row'>
        <input type='text' className='searchTerm' placeholder='Search Tweet' />
        <button type='submit' className='searchButton'>
          <Search />
        </button>
      </Stack>
    </div>
  );
}

export default SearchBar;
