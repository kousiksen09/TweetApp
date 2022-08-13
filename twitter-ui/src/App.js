import theme from './theme';
import './App.css';
//import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import UserRegisterLogIn from './Container/UserRegsiterLogin';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TweetHome from './Container/TweetHome';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        {/* <Provider store={store}>
        <h2>Welcome</h2>
      </Provider> */}
        <CssBaseline />
        <TweetHome />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
