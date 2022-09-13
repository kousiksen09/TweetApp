import { CheckBox } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Button,
} from "@mui/material";
//import { typography } from '@mui/system';
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerapiFetchInitiated } from "../../Redux/Action/APIFetchAction";
import "../../Utility/UserStyle.css";
import {
  isPasswordValid,
  isValidEmail,
  validatePhoneNumber,
} from "../HelperFunctions/FormValidation";
import { uploadfIle } from "../HelperFunctions/FileUpload";

function UserFrom(props) {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    MobileNumber: "",
    Country: "",
    State: "",
    Gender: 0,
    DateOfBirth: new Date(),
    ImageSrc: "",
    ImageFile: null,
  });
  const [error, setError] = useState({
    ERname: "",
    ERemail: "",
    ERpassword: "",
    ERMobileNumber: "",
    ERCountry: "",
    ERState: "",
    ERGender: "",
    ERDateOfBirth: "",
  });
  const [imageName, setImageName] = useState("");
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
        return { ...prevState, ERemail: "Email is not valid" };
      });
    } else {
      setError((prevState) => {
        return { ...prevState, ERemail: "" };
      });
    }
  };
  const passwordChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, password: event.target.value };
    });
    if (!isPasswordValid(event.target.value)) {
      setError((prevState) => {
        return {
          ...prevState,
          ERpassword:
            "Password should be with 7-15 charecter, should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
        };
      });
    } else {
      setError((prevState) => {
        return { ...prevState, ERpassword: "" };
      });
    }
  };
  const mobileChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, MobileNumber: event.target.value };
    });
    if (!validatePhoneNumber(event.target.value)) {
      setError((prevState) => {
        return { ...prevState, ERMobileNumber: "Mobile Number is not valid" };
      });
    } else {
      setError((prevState) => {
        return { ...prevState, ERMobileNumber: "" };
      });
    }
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
  const showPreview = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imagefile = event.target.files[0];
      setImageName(imagefile.name);
      setUserInput((prevState) => {
        return { ...prevState, ImageFile: imagefile };
      });
    }
  };
  const handleFormSubmission = (event) => {
    event.preventDefault();
    console.log(userInput.ImageFile);
    if (
      error.ERemail === "" &&
      error.ERMobileNumber === "" &&
      error.ERpassword === ""
    ) {
      var dob = new Date(userInput.DateOfBirth);
      const getMonthFromDob = (dob) => {
        let m = dob.getMonth();
        if (m < 10) {
          var a = m + 1;
          return "0" + a;
        }
        return m + 1;
      };

      const getDateFromDOB = (dob) => {
        let d = dob.getDate();
        if (d < 10) {
          return "0" + d;
        }
        return d;
      };
      const profile = {
        Twname: userInput.name,
        Twemail: userInput.email,
        Twpassword: userInput.password,
        TwMobileNumber: userInput.MobileNumber,
        TwCountry: userInput.Country,
        TwState: userInput.State,
        TwGender: parseInt(userInput.Gender),
        TwDateOfBirth:
          dob.getFullYear() +
          "-" +
          getMonthFromDob(dob) +
          "-" +
          getDateFromDOB(dob),
        TwImageFile: userInput.ImageFile,
      };
      dispatch(registerapiFetchInitiated(profile));
    }

    return;
  };
  const status = useSelector((state) => state.RegisterAPIReducer.status);
  const registeredUser = useSelector(
    (state) => state.RegisterAPIReducer.APIData[0]
  );
  useEffect(() => {
    if (status === "success") {
      uploadfIle(
        userInput.ImageFile,
        registeredUser.result.user.profilePicture
      );
    }
  });
  return (
    <form onSubmit={handleFormSubmission}>
      <Typography
        align="center"
        variant="h5"
        sx={{ color: "red", justifyContent: "center" }}
      >
        {props.modalError ? props.modalError : ""}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="Name"
            required
            fullWidth
            id="Name"
            label="Name"
            value={userInput.name}
            autoFocus
            onChange={nameChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="Email"
            required
            fullWidth
            error={error.ERemail}
            id="email"
            label="Email Address"
            autoFocus
            onChange={emailChangeHandler}
          />
          <Typography variant="body2" color="error">
            {error.ERemail}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            name="Mobile"
            required
            fullWidth
            error={error.ERMobileNumber}
            id="mobile"
            label="Phone Number"
            autoFocus
            onChange={mobileChangeHandler}
          />
          <Typography variant="body2" color="error">
            {error.ERMobileNumber}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="password"
            required
            fullWidth
            type="password"
            id="password"
            error={error.ERpassword}
            label="Password"
            autoFocus
            onChange={passwordChangeHandler}
          />
          <Typography variant="body2" color="error">
            {error.ERpassword}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="country"
            required
            fullWidth
            id="country"
            label="Country"
            autoFocus
            onChange={countryChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="state"
            required
            fullWidth
            id="state"
            label="State"
            autoFocus
            onChange={stateChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            row
            name="Gender"
            defaultValue="1"
            onChange={genderChangeHandler}
          >
            <FormControlLabel value="1" control={<Radio />} label="Female" />
            <FormControlLabel value="0" control={<Radio />} label="Male" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePicker
            label="Date Of Birth"
            name="DOB"
            value={userInput.DateOfBirth}
            openTo="year"
            views={["year", "month", "day"]}
            onChange={dobChangeHandler}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabel>Profile Picture</FormLabel>
          <div>
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                type="file"
                accept="image/*"
                className="form-contol-file"
                onChange={showPreview}
              />
            </Button>

            {imageName && <h2>{imageName}</h2>}
          </div>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<CheckBox value="allowExtraEmails" color="secondary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid>
      </Grid>
      {status === "loading" ? (
        <LoadingButton loading variant="contained">
          Submit
        </LoadingButton>
      ) : (
        <button type="submit" className="btn third">
          Sign Up
        </button>
      )}
    </form>
  );
}
export default UserFrom;
