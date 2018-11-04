/**
 * @flow
 * @relayHash 361382071568771104ed64d0fd6f473a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type HostListItem_host$ref = any;
export type CreateHostInput = {
  name?: ?string,
  user?: ?string,
  address?: ?string,
  port?: ?number,
  identityFile?: ?string,
  clientMutationId?: ?string,
};
export type CreateHostMutationVariables = {|
  input: CreateHostInput
|};
export type CreateHostMutationResponse = {|
  +createHost: ?{|
    +hostEdge: ?{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: HostListItem_host$ref,
      |}
    |},
    +viewer: ?{|
      +id: string
    |},
  |}
|};
export type CreateHostMutation = {|
  variables: CreateHostMutationVariables,
  response: CreateHostMutationResponse,
|};
*/


/*
mutation CreateHostMutation(
  $input: CreateHostInput!
) {
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

fragment HostListItem_host on Host {
  id
  name
  targetCount
  ...TargetList_host
}

fragment TargetList_host on Host {
  targets(first: 2147483647) {
    edges {
      node {
        id
        ...TargetListItem_target
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment TargetListItem_target on Target {
  name
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateHostInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateHostInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "viewer",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": [
    v2
  ]
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647,
    "type": "Int"
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "CreateHostMutation",
  "id": null,
  "text": "mutation CreateHostMutation(\n  $input: CreateHostInput!\n) {\n  createHost(input: $input) {\n    hostEdge {\n      node {\n        id\n        ...HostListItem_host\n      }\n    }\n    viewer {\n      id\n    }\n  }\n}\n\nfragment HostListItem_host on Host {\n  id\n  name\n  targetCount\n  ...TargetList_host\n}\n\nfragment TargetList_host on Host {\n  targets(first: 2147483647) {\n    edges {\n      node {\n        id\n        ...TargetListItem_target\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TargetListItem_target on Target {\n  name\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateHostMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createHost",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateHostPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "hostEdge",
            "storageKey": null,
            "args": null,
            "concreteType": "HostEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Host",
                "plural": false,
                "selections": [
                  v2,
                  {
                    "kind": "FragmentSpread",
                    "name": "HostListItem_host",
                    "args": null
                  }
                ]
              }
            ]
          },
          v3
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateHostMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createHost",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateHostPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "hostEdge",
            "storageKey": null,
            "args": null,
            "concreteType": "HostEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Host",
                "plural": false,
                "selections": [
                  v2,
                  v4,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "targetCount",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "targets",
                    "storageKey": "targets(first:2147483647)",
                    "args": v5,
                    "concreteType": "TargetConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "TargetEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Target",
                            "plural": false,
                            "selections": [
                              v2,
                              v4,
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "__typename",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "cursor",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "pageInfo",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "endCursor",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "hasNextPage",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "targets",
                    "args": v5,
                    "handle": "connection",
                    "key": "HostListItem_targets",
                    "filters": null
                  }
                ]
              }
            ]
          },
          v3
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9cca946c817ffb34be27f6c10556b11b';
module.exports = node;
