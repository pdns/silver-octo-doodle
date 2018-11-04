/**
 * @flow
 * @relayHash bcf0b53fdfdbd31b017049a0ccb698da
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type HostList_userHostData$ref = any;
export type SidePanelQueryVariables = {||};
export type SidePanelQueryResponse = {|
  +viewer: ?{|
    +id: string,
    +$fragmentRefs: HostList_userHostData$ref,
  |}
|};
export type SidePanelQuery = {|
  variables: SidePanelQueryVariables,
  response: SidePanelQueryResponse,
|};
*/


/*
query SidePanelQuery {
  viewer {
    id
    ...HostList_userHostData
  }
}

fragment HostList_userHostData on User {
  hosts(first: 2147483647) {
    edges {
      node {
        id
        ...HostListItem_host
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
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647,
    "type": "Int"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v5 = {
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
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "SidePanelQuery",
  "id": null,
  "text": "query SidePanelQuery {\n  viewer {\n    id\n    ...HostList_userHostData\n  }\n}\n\nfragment HostList_userHostData on User {\n  hosts(first: 2147483647) {\n    edges {\n      node {\n        id\n        ...HostListItem_host\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment HostListItem_host on Host {\n  id\n  name\n  targetCount\n  ...TargetList_host\n}\n\nfragment TargetList_host on Host {\n  targets(first: 2147483647) {\n    edges {\n      node {\n        id\n        ...TargetListItem_target\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TargetListItem_target on Target {\n  name\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SidePanelQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          v0,
          {
            "kind": "FragmentSpread",
            "name": "HostList_userHostData",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SidePanelQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          v0,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "hosts",
            "storageKey": "hosts(first:2147483647)",
            "args": v1,
            "concreteType": "HostConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "HostEdge",
                "plural": true,
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
                      v0,
                      v2,
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
                        "args": v1,
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
                                  v0,
                                  v2,
                                  v3
                                ]
                              },
                              v4
                            ]
                          },
                          v5
                        ]
                      },
                      {
                        "kind": "LinkedHandle",
                        "alias": null,
                        "name": "targets",
                        "args": v1,
                        "handle": "connection",
                        "key": "HostListItem_targets",
                        "filters": null
                      },
                      v3
                    ]
                  },
                  v4
                ]
              },
              v5
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "hosts",
            "args": v1,
            "handle": "connection",
            "key": "HostList_hosts",
            "filters": null
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '828a7ae544685b7d0b211c91b074b35b';
module.exports = node;
