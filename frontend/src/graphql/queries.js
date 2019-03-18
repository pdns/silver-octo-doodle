
export const QUERY_HOST_LIST = `
  query Summary {
    viewer {
      id
      hosts(first: 2147483647) {
        edges {
          node {
            id
            name
            targetCount
            targets(first: 2147483647) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const MUTATION_CREATE_HOST = `
  mutation CreateHost($name: String, $user: String, $address: String, $port: Int, $identityFile: String) {
    createHost(input: {name: $name, user: $user, address: $address, port: $port, identityFile: $identityFile}) {
      hostEdge {
        node {
          id
          name
          targetCount
          targets(first: 2147483647) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const MUTATION_CREATE_TARGET = `
  mutation CreateTarget($name: String, $from: String, $to: String, $hostId: ID) {
    createTarget(input: {name: $name, from: $from, to: $to, hostId: $hostId}) {
      targetEdge {
        node {
          id
          name
        }
      }
    }
  }
`;
