import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Utility/TweetHomeStyle.css';
import TWUser from '../UtilityComponent/TWUser';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  txtLight: {
    color: theme.palette.text.primary,
  },
}));
function WhatsHappening() {
  const nameList = useSelector((state) => state.FindUserNameReducer.APIData[0]);
  const apiStts = useSelector((state) => state.FindUserNameReducer.status);
  const userList = useSelector((state) => state.GetAllUserReducer.APIData[0]);
  const userApiStts = useSelector((state) => state.GetAllUserReducer.status);
  return (
    <div className='hpRoot'>
      <Stack direction='column'>
        <div className='searchContainer'>
          <SearchBar />
          <div className='searchResult'>
            {apiStts === 'success' && (
              <Typography variant='h4' marginTop='.5vh' fontSize='1.3rem'>
                We've Found ...
              </Typography>
            )}
            {apiStts === 'success' &&
              nameList &&
              nameList.map((data, id) => (
                <div key={id} className='usernameList'>
                  <Link className='userNameTxt' to={`../profile/${data}`}>
                    @ {data}
                  </Link>
                </div>
              ))}
          </div>
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
          {userApiStts === 'success' &&
            userList &&
            userList.map((user, id) => (
              <Link className='userNameTxt' to={`../profile/${user.userName}`}>
              <TWUser
                key={id}
                name={user.name}
                isActive={user.isActive}
                username={user.userName}
              />
              </Link>
            ))}
        </div>
      </Stack>
    </div>
  );
}

export default WhatsHappening;
