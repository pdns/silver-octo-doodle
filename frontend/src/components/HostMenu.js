import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import MagnifyIcon from 'mdi-material-ui/Magnify';

class HostMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  createHandler = () => {
    this.props.onCreate();
    this.handleClose();
  }

  viewHandler = () => {
    this.props.onView();
    this.handleClose();
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <IconButton
          onClick={this.handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.createHandler}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create target" />
          </MenuItem>
          <MenuItem onClick={this.viewHandler}>
            <ListItemIcon>
              <MagnifyIcon />
            </ListItemIcon>
            <ListItemText primary="View details" />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

HostMenu.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default HostMenu;
