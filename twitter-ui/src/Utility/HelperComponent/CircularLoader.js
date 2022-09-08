import { Grid, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { pxToRem, pxToVh, pxToVw } from '../../theme';

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    position: 'relative',
    top: '0.3rem',
    height: `${pxToVh(85)} !important`,
    width: `${pxToVw(85)} !important`,
    color: '#5DAAE0',
  },
  circularDiv: {
    position: 'relative',
    display: 'flex',
    top: '2vh',
    justifyContent: 'center',
  },
  circular: {
    animation: '$rotate 2s linear infinite',
    height: '100%',
    transformOrigin: 'center center',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  '@keyframes rotate': {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  circularPath: {
    strokeDasharray: '1, 200',
    strokeDashoffset: '0',
    animation: '$dash 1.5s ease-in-out infinite',
    strokeLinecap: 'round',
  },
  '@keyframes dash': {
    '0%': {
      strokeDasharray: '1, 200',
      strokeDashoffset: '0',
    },
    '50%': {
      strokeDasharray: '89, 200',
      strokeDashoffset: `${pxToRem(35)}`,
    },
    '100%': {
      strokeDasharray: '89, 200',
      strokeDashoffset: `${pxToRem(124)}`,
    },
  },
}));

function CircularLoader() {
  const classes = useStyles();
  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <div className={classes.circularDiv}>
          <CircularProgress
            classes={{
              root: classes.circularProgress,
              svg: classes.circular,
              circle: classes.circleLdr,
              circleIndeterminate: classes.circularPath,
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default CircularLoader;
