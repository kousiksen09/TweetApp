import { CheckBox } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { FormControlLabel, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInapiFetchInitiated } from '../../Redux/Action/APIFetchAction';
import '../../Utility/UserStyle.css';
function LoginForm() {
  const [enterdUserName, setEnteredUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remeberMe, setRemeberMe] = useState(true);
  const dispatch = useDispatch();
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const remberMeChangeHandler = (event) => {
    setRemeberMe(event.target.checked);
  };
  const logInSubmit = (event) => {
    event.preventDefault();
    if (enterdUserName !== '' && password !== '') {
      const logInCred = {
        TWuserName: enterdUserName,
        TWPassword: password,
      };
      dispatch(logInapiFetchInitiated(logInCred));
    }
  };
  const status = useSelector((state) => state.RegisterAPIReducer.status);

  return (
    <form className='logInForm' onSubmit={logInSubmit}>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12}>
          <TextField
            name='Email / UserName'
            required
            id='uname'
            label='UserName'
            value={enterdUserName}
            autoFocus
            onChange={usernameChangeHandler}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <TextField
            name='Password'
            required
            type='password'
            id='pwd'
            label='Password'
            value={password}
            autoFocus
            onChange={passwordChangeHandler}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <FormControlLabel
            control={
              <CheckBox checked={remeberMe} onChange={remberMeChangeHandler} />
            }
            label='  Rembere Me?'
          />
        </Grid>
      </Grid>
      {status === 'loading' ? (
        <LoadingButton loading variant='contained'>
          Submit
        </LoadingButton>
      ) : (
        <button type='submit' className='btn third logInButton'>
          Log In
        </button>
      )}
    </form>
  );
}

export default LoginForm;
