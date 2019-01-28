/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HostListItem from '../../src/components/HostListItem';

Enzyme.configure({ adapter: new Adapter() });

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
  let host;
  let relay;
  let wrapper;

  beforeEach(() => {
    host = {
      name: 'my-host',
      targetCount: 9,
    };
    relay = {
      environment: 'relay-env',
    };

    wrapper = shallow(<HostListItem host={host} relay={relay} />);
  });

  it('should render correctly with no targets', () => {
    host.targetCount = 0;
    const tree = renderer
      .create(<HostListItem host={host} relay={relay} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with targets', () => {
    const tree = renderer
      .create(<HostListItem host={host} relay={relay} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should toggle Collapseable panel by clicking ListItem', () => {
    expect(wrapper.find('Collapse').prop('in')).toBe(false);
    wrapper.find('ListItem').simulate('click');
    expect(wrapper.find('Collapse').prop('in')).toBe(true);
    wrapper.find('ListItem').simulate('click');
    expect(wrapper.find('Collapse').prop('in')).toBe(false);
  });

  it('should open Dialog by calling function passed to HostMenu', () => {
    expect(wrapper.find('Dialog').prop('open')).toBe(false);
    wrapper.find('HostMenu').prop('onCreate')();
    expect(wrapper.find('Dialog').prop('open')).toBe(true);
  });

  it('should close Dialog by calling function passed to TargetInputForm.onCancel', () => {
    wrapper.find('HostMenu').prop('onCreate')();
    wrapper.find('TargetInputForm').prop('onCancel')();
    expect(wrapper.find('Dialog').prop('open')).toBe(false);
  });

  it('should call CreateHostMutation.commit and close Dialog by calling function passed to TargetInputForm.onSubmit', () => {
    wrapper.find('HostMenu').prop('onCreate')();
    wrapper.find('TargetInputForm').prop('onSubmit')();
    expect(wrapper.find('Dialog').prop('open')).toBe(false);
  });
});
