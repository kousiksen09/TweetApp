import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';
import { pxToRem } from '../theme';
import { useState } from 'react';
import '../Utility/UserStyle.css';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
  },
  paper: {
    margin: '25% auto',
    width: '50%',
    height: '50%',
    backgroundColor: theme.palette.primary.main,
  },
  reportTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    fontSize: pxToRem(22),
    color: '#FFFFFF',
    fontWeight: '700',
  },
  nameTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: pxToRem(26),
  },
}));

function TwModal(props) {
  const classes = useStyles();
  const { open, onClose } = props;
  const [header] = useState(props.header);
  const handleOnCloseButton = (event, reason) => {
    if (reason !== 'backdropClick') {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      classes={{
        root: classes.root,
        paper: classes.paper,
      }}
      className='MuiPaper-root MuiDialog-paper'
    >
      <DialogTitle id='alert-dialog-title' className={classes.reportTitle}>
        <Typography className={classes.nameTitle}>{header}</Typography>
        <IconButton onClick={handleOnCloseButton}>
          <Close className='MuiButtonBase-root MuiIconButton-root' />
        </IconButton>
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}

export default TwModal;
