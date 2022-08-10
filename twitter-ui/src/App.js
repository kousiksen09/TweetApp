import theme from './theme';
import './App.css';
//import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <Provider store={store}>
        <h2>Welcome</h2>
      </Provider> */}
      <h2>Welcome</h2>
    </ThemeProvider>
  );
}

export default App;
