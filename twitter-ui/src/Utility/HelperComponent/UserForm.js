import { CheckBox } from '@mui/icons-material';
import {
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import '../../Utility/UserStyle.css';
import { isValidEmail } from '../HelperFunctions/FormValidation';

function UserFrom() {
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
    MobileNumber: '',
    Country: '',
    State: '',
    Gender: 0,
    DateOfBirth: new Date(),
  });
  const [error, setError] = useState({
    ERname: '',
    ERemail: '',
    ERpassword: '',
    ERMobileNumber: '',
    ERCountry: '',
    ERState: '',
    ERGender: '',
    ERDateOfBirth: '',
  });

  const nameChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };
  const emailChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, email: event.target.value };
    });
    if (!isValidEmail(event.target.value)) {
      setError((prevState) => {
        return { ERemail: 'Email is not valid' };
      });
    }
  };
  const passwordChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };
  const mobileChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, MobileNumber: event.target.value };
    });
  };
  const countryChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, Country: event.target.value };
    });
  };
  const stateChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, State: event.target.value };
    });
  };
  const genderChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, Gender: event.target.value };
    });
  };
  const dobChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, DateOfBirth: event };
    });
  };
  const handleFormSubmission = (event) => {
    event.preventDefault();
    const profile = {
      Twname: userInput.name,
      Twemail: userInput.email,
      Twpassword: userInput.password,
      TwMobileNumber: userInput.MobileNumber,
      TwCountry: userInput.Country,
      TwState: userInput.State,
      TwGender: parseInt(userInput.Gender),
      TwDateOfBirth: new Date(userInput.DateOfBirth),
    };
    console.log(profile);
  };
  return (
    <form onSubmit={handleFormSubmission}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name='Name'
            required
            fullWidth
            id='Name'
            label='Name'
            value={userInput.name}
            autoFocus
            onChange={nameChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name='Email'
            required
            fullWidth
            error={error.ERemail}
            id='email'
            label='Email Address'
            autoFocus
            onChange={emailChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type='number'
            name='Mobile'
            required
            fullWidth
            id='mobile'
            label='Phone Number'
            autoFocus
            onChange={mobileChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name='password'
            required
            fullWidth
            id='password'
            label='Password'
            autoFocus
            onChange={passwordChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name='country'
            required
            fullWidth
            id='country'
            label='Country'
            autoFocus
            onChange={countryChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name='state'
            required
            fullWidth
            id='state'
            label='State'
            autoFocus
            onChange={stateChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            row
            name='Gender'
            defaultValue='1'
            onChange={genderChangeHandler}
          >
            <FormControlLabel value='1' control={<Radio />} label='Female' />
            <FormControlLabel value='0' control={<Radio />} label='Male' />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label='Date Of Birth'
            name='DOB'
            value={userInput.DateOfBirth}
            openTo='year'
            views={['year', 'month', 'day']}
            onChange={dobChangeHandler}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<CheckBox value='allowExtraEmails' color='secondary' />}
            label='I want to receive inspiration, marketing promotions and updates via email.'
          />
        </Grid>
      </Grid>
      <button type='submit' className='btn third'>
        Sign Up
      </button>
    </form>
  );
}
export default UserFrom;
