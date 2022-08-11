import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { pxToRem, pxToVh, pxToVw } from '../theme';
import UserFrom from '../Utility/HelperComponent/UserForm';
import whiteLogo from '../Utility/image/WhiteLogo.png';
import '../Utility/UserStyle.css';
import TwModal from '../UtilityComponent/TwModal';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
  },
  coolSvg: {
    justifyContent: 'center',
    minHeight: '45vh',
    height: '100%',
    position: 'relative',
  },
  twRegBg: {
    inset: '0px',
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: '-1',
  },
  twCss2: {
    position: 'relative',
    margin: '0 auto',
    padding: '10vw',
    height: 'auto',
  },
  tweetBirtd: {
    maxHeight: pxToVh(480),
    height: '50%',
    color: '#FFFFFF',
    justifyContent: 'center',
  },
  twCss3: {
    minWidth: '45vh',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: pxToVw(16),
    height: '100%',
    boxSizing: 'border-box',
    border: '0 solid #000',
  },
  twCss4: {
    position: 'relative',
    padding: pxToVw(20),
    top: pxToVh(120),
    minWidth: pxToVw(438),
  },
  reglogo: {
    height: '3rem',
    paddingBottom: pxToRem(12),
    alignSelf: 'flex-start',
  },
  btnRegister: {
    position: 'relative',

    backgroundColor: 'rgb(29, 155, 240)',
    fontSize: pxToRem(20),
    fontWeight: 700,
    color: '#FFFFFF',
    height: pxToVh(60),
    width: pxToVw(320),
    top: pxToVh(40),
    borderRadius: pxToRem(30),
    minWidth: pxToVw(36),
  },
}));

function Register() {
  const classes = useStyles();
  const [isModalOpen, setModalState] = useState(false);

  const handleOpen = () => {
    setModalState(true);
  };
  const onModalClose = (event, reason) => {
    if (reason !== 'backdropClick') setModalState(false);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
          <div className={classes.coolSvg}>
            <img
              alt=''
              draggable='false'
              src='https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png'
              className={classes.twRegBg}
            />
            <div className={classes.twCss2}>
              <img src={whiteLogo} alt='logo' className={classes.tweetBirtd} />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
          <div className={classes.twCss3}>
            <div className={classes.twCss4}>
              <img className={classes.reglogo} alt='logo' src={whiteLogo} />
              <Typography
                className='twTextHapen'
                fontSize='3rem'
                variant='h2'
                component='h2'
              >
                Happening now
              </Typography>
              <Typography
                className='twTextHapen'
                fontSize='1.4rem'
                variant='h5'
                component='h5'
                marginTop='2vh'
              >
                Join Twitter today.
              </Typography>

              <button className={classes.btnRegister} onClick={handleOpen}>
                Register With Email
              </button>
            </div>
          </div>
        </Grid>
        <div className={classes.nameModal}>
          <TwModal
            open={isModalOpen}
            onClose={onModalClose}
            header='Create Your Account'
          >
            <UserFrom />
          </TwModal>
        </div>
      </Grid>
    </div>
  );
}

export default Register;
