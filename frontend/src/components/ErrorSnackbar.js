import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function ErrorSnackbar(props) {
  const { classes, errors, onClose } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!errors}
    >
      <SnackbarContent
        className={classes.error}
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={classes.iconVariant} />
            {errors && errors.map(e => e.message).join(', ')}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

ErrorSnackbar.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.array,
  onClose: PropTypes.func,
};

export default withStyles(styles)(ErrorSnackbar);
