import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import CollapseIcon from '@material-ui/icons/ExpandLess';
import DesktopIcon from 'mdi-material-ui/DesktopClassic';
import { graphql, createFragmentContainer } from 'react-relay';
import TargetList from './TargetList';
import HostMenu from './HostMenu';
import TargetInputForm from './TargetInputForm';
import CreateTargetMutation from '../mutations/CreateTargetMutation';

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
    CreateTargetMutation.commit(this.props.relay.environment, input);
    this.closeDialog();
  }

  render() {
    const { host } = this.props;
    const { open } = this.state;
    const hasTargets = host.targetCount > 0;
    const icon = open ? <CollapseIcon /> : <ExpandIcon />;

    return (
      <React.Fragment>
        <ListItem button onClick={this.toggleExpand}>
          <Avatar>
            <DesktopIcon />
          </Avatar>
          <ListItemText>{host.name}</ListItemText>
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
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
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
  relay: PropTypes.any,
};

export default createFragmentContainer(
  HostListItem,
  graphql`
    fragment HostListItem_host on Host {
      id
      name
      targetCount
      ...TargetList_host
    }
  `,
);
