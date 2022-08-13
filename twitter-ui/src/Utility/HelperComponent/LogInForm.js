import { CheckBox } from '@mui/icons-material';
import { FormControlLabel, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import '../../Utility/UserStyle.css';
function LoginForm() {
  const [enterdUserName, setEnteredUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remeberMe, setRemeberMe] = useState(true);
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const remberMeChangeHandler = (event) => {
    setRemeberMe(event.target.checked);
  };
  return (
    <form className='logInForm'>
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
      <button type='submit' className='btn third logInButton'>
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
