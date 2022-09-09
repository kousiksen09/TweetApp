import { makeStyles } from '@mui/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import UserRegisterLogIn from './UserRegsiterLogin';
import TweetHome from './TweetHome';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Roboto',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
}));

function Twitter() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<UserRegisterLogIn />} />
          <Route path='/feed' element={<TweetHome />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Twitter;
