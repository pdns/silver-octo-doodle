import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import HostListItem from './HostListItem';
import HostInputForm from './HostInputForm';
import { createHost } from '../redux/actions';

class HostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dialog: false };
  }

  handleClick = () => {
    this.setState({ dialog: true });
  }

  handleClose = () => {
    this.setState({ dialog: false });
  }

  handleCreate = (input) => {
    this.props.createHost({ variables: input });
    this.handleClose();
  }

  render() {
    const hostsItems = this.props.hosts.edges.map(e =>
      <HostListItem key={e.node.id} host={e.node} />);

    return (
      <React.Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create host" />
        </ListItem>
        <Divider />
        <Dialog open={this.state.dialog} fullWidth>
          <DialogTitle>
            Create new host
          </DialogTitle>
          <DialogContent>
            <HostInputForm onCancel={this.handleClose} onSubmit={this.handleCreate} />
          </DialogContent>
        </Dialog>
        <List>
          {hostsItems}
        </List>
      </React.Fragment>
    );
  }
}

HostList.propTypes = {
  hosts: PropTypes.object.isRequired,
  createHost: PropTypes.func,
};

const mapDispatchToProps = {
  createHost,
};

export default connect(null, mapDispatchToProps)(HostList);
