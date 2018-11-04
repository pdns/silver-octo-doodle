/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type TargetList_host$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type HostListItem_host$ref: FragmentReference;
export type HostListItem_host = {|
  +id: string,
  +name: ?string,
  +targetCount: ?number,
  +$fragmentRefs: TargetList_host$ref,
  +$refType: HostListItem_host$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "HostListItem_host",
  "type": "Host",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "targetCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TargetList_host",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '81d94f6a227db878a04675059319608c';
module.exports = node;
