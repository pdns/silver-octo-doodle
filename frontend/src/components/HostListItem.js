import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  Avatar,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from '@material-ui/core';
import {
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
} from '@material-ui/icons';
import DesktopIcon from 'mdi-material-ui/DesktopClassic';
import TargetList from './TargetList';
import HostMenu from './HostMenu';
import TargetInputForm from './TargetInputForm';
import { createTarget } from '../redux/actions';

const styles = {
  truncateOverflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

class HostListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialog: false,
    };
  }

  toggleExpand = () => {
    this.setState({ open: !this.state.open });
  }

  openDialog = () => {
    this.setState({ dialog: true });
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  handleCreate = (input) => {
    this.props.createTarget({
      variables: input,
      context: { hostId: this.props.host.id },
    });
    this.closeDialog();
  }

  render() {
    const { host, classes } = this.props;
    const { open } = this.state;
    const hasTargets = host.targetCount > 0;
    const icon = open ? <CollapseIcon /> : <ExpandIcon />;

    return (
      <React.Fragment>
        <ListItem button onClick={this.toggleExpand}>
          <Avatar>
            <DesktopIcon />
          </Avatar>
          <ListItemText className={classes.truncateOverflow}>
            <Typography className={classes.truncateOverflow}>
              {host.name}
            </Typography>
          </ListItemText>
          {hasTargets &&
            <ListItemIcon>
              {icon}
            </ListItemIcon>
          }
          <ListItemSecondaryAction>
            <HostMenu onCreate={this.openDialog} onView={() => { console.log('TODO'); }} />
          </ListItemSecondaryAction>
        </ListItem>
        {hasTargets &&
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TargetList host={host} />
          </Collapse>
        }
        <Dialog open={this.state.dialog} fullWidth>
          <DialogTitle>
            Create new target
          </DialogTitle>
          <DialogContent>
            <TargetInputForm
              onCancel={this.closeDialog}
              onSubmit={this.handleCreate}
              hosts={[host]}
              defaultHost={host}
            />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

HostListItem.propTypes = {
  host: PropTypes.object.isRequired,
  createTarget: PropTypes.func,
  classes: PropTypes.object,
};

const mapDispatchToProps = {
  createTarget,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(HostListItem));
