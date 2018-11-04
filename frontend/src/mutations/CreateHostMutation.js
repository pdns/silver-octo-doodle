import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreateHostMutation($input: CreateHostInput!) {
    createHost(input: $input) {
      hostEdge {
        node {
          id
          ...HostListItem_host
        }
      }
      viewer {
        id
      }
    }
  }
`;

const sharedUpdater = (store, newEdge, user) => {
  const userProxy = store.get(user.getValue('id'));
  const conn = ConnectionHandler.getConnection(userProxy, 'HostList_hosts');
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
};

function commit(environment, input) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input,
      },
      updater: (store) => {
        // Get the payload returned from the server
        const payload = store.getRootField('createHost');
        const newEdge = payload.getLinkedRecord('hostEdge');
        const user = payload.getLinkedRecord('viewer');
        sharedUpdater(store, newEdge, user);
      },
    },
  );
}

export default { commit };
