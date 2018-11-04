import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreateTargetMutation($input: CreateTargetInput!) {
    createTarget(input: $input) {
      targetEdge {
        node {
          id
          ...TargetListItem_target
          host {
            id
          }
        }
      }
    }
  }
`;

const sharedUpdater = (store, newEdge, host) => {
  const hostProxy = store.get(host.getValue('id'));
  const conn = ConnectionHandler.getConnection(hostProxy, 'HostListItem_targets');
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
  hostProxy.setValue(hostProxy.getValue('targetCount') + 1, 'targetCount');
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
        const payload = store.getRootField('createTarget');
        const newEdge = payload.getLinkedRecord('targetEdge');
        const host = newEdge.getLinkedRecord('node').getLinkedRecord('host');
        sharedUpdater(store, newEdge, host);
      },
    },
  );
}

export default { commit };
