/**
 * @flow
 * @relayHash 546509daf908dc77bd934642cf360f03
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TargetListItem_target$ref = any;
export type CreateTargetInput = {
  name?: ?string,
  from?: ?string,
  to?: ?string,
  hostId?: ?string,
  clientMutationId?: ?string,
};
export type CreateTargetMutationVariables = {|
  input: CreateTargetInput
|};
export type CreateTargetMutationResponse = {|
  +createTarget: ?{|
    +targetEdge: ?{|
      +node: ?{|
        +id: string,
        +host: ?{|
          +id: string
        |},
        +$fragmentRefs: TargetListItem_target$ref,
      |}
    |}
  |}
|};
export type CreateTargetMutation = {|
  variables: CreateTargetMutationVariables,
  response: CreateTargetMutationResponse,
|};
*/


/*
mutation CreateTargetMutation(
  $input: CreateTargetInput!
) {
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

fragment TargetListItem_target on Target {
  name
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateTargetInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateTargetInput!"
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
  "name": "host",
  "storageKey": null,
  "args": null,
  "concreteType": "Host",
  "plural": false,
  "selections": [
    v2
  ]
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "CreateTargetMutation",
  "id": null,
  "text": "mutation CreateTargetMutation(\n  $input: CreateTargetInput!\n) {\n  createTarget(input: $input) {\n    targetEdge {\n      node {\n        id\n        ...TargetListItem_target\n        host {\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment TargetListItem_target on Target {\n  name\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateTargetMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createTarget",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateTargetPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "targetEdge",
            "storageKey": null,
            "args": null,
            "concreteType": "TargetEdge",
            "plural": false,
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
                  {
                    "kind": "FragmentSpread",
                    "name": "TargetListItem_target",
                    "args": null
                  },
                  v3
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateTargetMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createTarget",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateTargetPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "targetEdge",
            "storageKey": null,
            "args": null,
            "concreteType": "TargetEdge",
            "plural": false,
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
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  },
                  v3
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b4f010a317af2e3ec00d8193e6287b8e';
module.exports = node;
