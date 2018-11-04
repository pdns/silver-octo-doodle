import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { graphql, createFragmentContainer } from 'react-relay';
import TargetListItem from './TargetListItem';


function TargetList(props) {
  const items = props.host.targets.edges.map(({ node }) =>
    <TargetListItem key={node.id} target={node} />);

  return (
    <List component="div" disablePadding>
      {items}
    </List>
  );
}

TargetList.propTypes = {
  host: PropTypes.object,
};

export default createFragmentContainer(
  TargetList,
  graphql`
    fragment TargetList_host on Host {
      targets(first: 2147483647) @connection(key: "HostListItem_targets") {
        edges {
          node {
            id
            ...TargetListItem_target
          }
        }
      }
    }
  `,
);
