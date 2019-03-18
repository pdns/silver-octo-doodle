import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import TargetIcon from 'mdi-material-ui/Target';

const styles = {
  truncateOverflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

function TargetListItem(props) {
  const { target, classes } = props;

  return (
    <ListItem button>
      <ListItemIcon>
        <TargetIcon />
      </ListItemIcon>
      <ListItemText inset className={classes.truncateOverflow}>
        <Typography className={classes.truncateOverflow}>
          {target.name}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}

TargetListItem.propTypes = {
  target: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(styles)(TargetListItem);
