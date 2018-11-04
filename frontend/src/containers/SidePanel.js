import React from 'react';
import PropTypes from 'prop-types';
import { graphql, QueryRenderer } from 'react-relay';
import environment from '../relay-environment';
import HostList from '../components/HostList';

function SidePanel() {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query SidePanelQuery {
          viewer {
            id
            ...HostList_userHostData
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return <HostList userHostData={props.viewer}/>;
      }}
    />
  );
}

SidePanel.propTypes = {
  viewer: PropTypes.any,
};

export default SidePanel;
