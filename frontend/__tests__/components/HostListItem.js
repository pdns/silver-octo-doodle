/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import HostListItem from '../../src/components/HostListItem';

jest.mock('react-relay', () => ({
  createFragmentContainer: x => x,
}));

jest.mock('@material-ui/core/Avatar', () => 'Avatar');
jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/Collapse', () => 'Collapse');
jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');
jest.mock('@material-ui/core/ListItemIcon', () => 'ListItemIcon');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/ListItemSecondaryAction', () => 'ListItemSecondaryAction');
jest.mock('@material-ui/icons/ExpandLess', () => 'CollapseIcon');
jest.mock('@material-ui/icons/ExpandMore', () => 'ExpandIcon');
jest.mock('mdi-material-ui/DesktopClassic', () => 'DesktopIcon');

jest.mock('../../src/components/TargetList', () => 'TargetList');
jest.mock('../../src/components/HostMenu', () => 'HostMenu');
jest.mock('../../src/components/TargetInputForm', () => 'TargetInputForm');
jest.mock('../../src/mutations/CreateTargetMutation', () => ({ commit: () => ({}) }));

describe('HostListItem', () => {
  it('should render correctly with no targets', () => {
    const host = {
      name: 'my-host',
      targetCount: 0,
    };
    const relay = {
      environment: {},
    };
    const tree = renderer
      .create(<HostListItem host={host} relay={relay} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with targets', () => {
    const host = {
      name: 'my-host',
      targetCount: 9,
    };
    const relay = {
      environment: 'relay-env',
    };
    const tree = renderer
      .create(<HostListItem host={host} relay={relay} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
