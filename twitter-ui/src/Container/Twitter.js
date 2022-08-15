import { makeStyles } from '@mui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Roboto',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
}));

function Twitter() {
  const classes = useStyles();
  <div className={classes.root}>
    <BrowserRouter>
      <Switch></Switch>
    </BrowserRouter>
  </div>;
  return <div>Twitter</div>;
}

export default Twitter;
