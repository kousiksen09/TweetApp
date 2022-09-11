import { Avatar, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUserapiFetchInitiated } from '../Redux/Action/GetAllUserAction';
import '../Utility/TweetHomeStyle.css';
import TWUser from '../UtilityComponent/TWUser';
import SearchBar from './SearchBar';

function WhatsHappening() {
  const dispatch = useDispatch();
  const arr = [1, 2, 3, 4, 5, 6];
  useEffect(() => {
    const payload = {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('userName'),
    };
    dispatch(getAllUserapiFetchInitiated(payload));
  }, [dispatch]);
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
          {userApiStts === 'loading' &&
            arr.map(() => (
              <>
                <Stack direction='row' spacing={2}>
                  <Skeleton variant='circular'>
                    <Avatar />
                  </Skeleton>
                  <Skeleton width='100%'>
                    <Typography>.</Typography>
                  </Skeleton>
                </Stack>
                <Skeleton width='50%'>
                  <Typography>.</Typography>
                </Skeleton>
              </>
            ))}
          {userApiStts === 'success' &&
            userList &&
            userList.map((user, id) => (
              <Link className='userNameTxt' to={`../profile/${user.userName}`}>
                <TWUser
                  key={id}
                  name={user.name}
                  isActive={user.isActive}
                  username={user.userName}
                  image={user.profilePicture}
                />
              </Link>
            ))}
        </div>
      </Stack>
    </div>
  );
}

export default WhatsHappening;
