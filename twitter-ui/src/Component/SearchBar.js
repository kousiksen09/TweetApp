import { Search } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { findUserNameapiFetchInitiated } from '../Redux/Action/FindUserNameAction';
import '../Utility/TweetHomeStyle.css';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));
function SearchBar() {
  const classes = useStyles();
  const [enterdUserName, setEnteredUsername] = useState('');
  const dispatch = useDispatch();
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const nameSearchHandler = (event) => {
    event.preventDefault();
    if (enterdUserName !== '') {
      const payload = {
        token: localStorage.getItem('token'),
        name: enterdUserName,
      };
      dispatch(findUserNameapiFetchInitiated(payload));
    }
  };
  return (
    <div className={classes.root}>
      <form onSubmit={nameSearchHandler}>
      <Stack direction='row'>
          <input
            value={enterdUserName}
            onChange={usernameChangeHandler}
            type='text'
            className='searchTerm'
            placeholder='Search Tweet'
          />
        <button type='submit' className='searchButton'>
          <Search />
        </button>
      </Stack>
      </form>
    </div>
  );
}

export default SearchBar;
