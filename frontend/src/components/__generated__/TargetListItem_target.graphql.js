/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TargetListItem_target$ref: FragmentReference;
export type TargetListItem_target = {|
  +name: ?string,
  +$refType: TargetListItem_target$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "TargetListItem_target",
  "type": "Target",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '1a3eae7ea008b4a23dee9dd1ca7d3865';
module.exports = node;
