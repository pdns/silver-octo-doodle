import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TargetIcon from 'mdi-material-ui/Target';
import { graphql, createFragmentContainer } from 'react-relay';

function TargetListItem(props) {
  const { target } = props;

  return (
    <ListItem button>
      <ListItemIcon>
        <TargetIcon />
      </ListItemIcon>
      <ListItemText inset primary={target.name} />
    </ListItem>
  );
}

TargetListItem.propTypes = {
  target: PropTypes.object,
};

export default createFragmentContainer(
  TargetListItem,
  graphql`
    fragment TargetListItem_target on Target {
      name
    }
  `,
);
