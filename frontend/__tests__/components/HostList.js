/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import HostList from '../../src/components/HostList';

jest.mock('react-relay', () => ({
  createFragmentContainer: x => x,
}));

jest.mock('@material-ui/core/List', () => 'List');
jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/Divider', () => 'Divider');
jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');
jest.mock('@material-ui/core/ListItemIcon', () => 'ListItemIcon');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/icons/Add', () => 'AddIcon');

jest.mock('../../src/components/HostListItem', () => 'HostListItem');
jest.mock('../../src/components/HostInputForm', () => 'HostInputForm');
jest.mock('../../src/mutations/CreateHostMutation', () => ({ commit: () => ({}) }));

describe('HostList', () => {
  it('should render correctly with no hosts', () => {
    const data = {
      hosts: {
        edges: [],
      },
    };
    const relay = {
      environment: 'relay-env',
    };
    const tree = renderer
      .create(<HostList userHostData={data} relay={relay} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with hosts', () => {
    const data = {
      hosts: {
        edges: [
          { node: { id: '1' } },
        ],
      },
    };
    const relay = {
      environment: 'relay-env',
    };
    const tree = renderer
      .create(<HostList userHostData={data} relay={relay} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
