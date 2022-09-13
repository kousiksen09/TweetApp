/* eslint-disable react-hooks/exhaustive-deps */
import Register from '../Component/Register';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, userAction } from '../Redux/Action/UserAction';

export default function UserRegisterLogIn() {
  const registerUser = useSelector((state) => state.RegisterAPIReducer);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      registerUser.status === 'success' &&
      registerUser.APIData[0].isSuccess
    ) {
      localStorage.setItem('token', registerUser.APIData[0].result.authToken);
      localStorage.setItem('authenticated', true);
      localStorage.setItem(
        'userName',
        registerUser.APIData[0].result.user.userName
      );
      dispatch(isAuthenticated(true));
      dispatch(userAction(registerUser.APIData[0].result.user));
      navigate('/feed');
    }
    if (registerUser.status === 'Error') {
      setErrorMsg(registerUser.APIData);
    }
  }, [registerUser.status]);

  return <Register error={errorMsg} />;
}
