import theme from './theme';
import './App.css';
//import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import Twitter from './Container/Twitter';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import store from './Redux/store/store';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Twitter />
        </Provider>
        <CssBaseline />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
