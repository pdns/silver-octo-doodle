/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HostListItem from '../../src/components/HostListItem';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  connect: () => x => x,
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
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/icons/ExpandLess', () => 'CollapseIcon');
jest.mock('@material-ui/icons/ExpandMore', () => 'ExpandIcon');
jest.mock('mdi-material-ui/DesktopClassic', () => 'DesktopIcon');

jest.mock('../../src/components/TargetList', () => 'TargetList');
jest.mock('../../src/components/HostMenu', () => 'HostMenu');
jest.mock('../../src/components/TargetInputForm', () => 'TargetInputForm');

describe('HostListItem', () => {
  const createTargetMock = jest.fn();
  let host;
  let wrapper;

  beforeEach(() => {
    host = {
      id: 'my-host-id',
      name: 'my-host',
      targetCount: 9,
    };

    createTargetMock.mockReset();
    wrapper = shallow(<HostListItem host={host} createTarget={createTargetMock} />);
    wrapper = wrapper.dive();
  });

  it('should render correctly with no targets', () => {
    host.targetCount = 0;
    const tree = renderer
      .create(<HostListItem host={host} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with targets', () => {
    const tree = renderer
      .create(<HostListItem host={host} />)
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

  it('should call props.createTarget and close Dialog by calling function passed to TargetInputForm.onSubmit', () => {
    wrapper.find('HostMenu').prop('onCreate')();
    wrapper.find('TargetInputForm').prop('onSubmit')('yay');
    expect(createTargetMock).toHaveBeenCalledWith({ variables: 'yay', context: { hostId: 'my-host-id' } });
    expect(wrapper.find('Dialog').prop('open')).toBe(false);
  });
});
