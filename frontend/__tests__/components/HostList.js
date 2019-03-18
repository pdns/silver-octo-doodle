/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HostList from '../../src/components/HostList';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  connect: () => x => x,
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

describe('HostList', () => {
  const createHostMock = jest.fn();
  let data;
  let wrapper;

  beforeEach(() => {
    data = {
      edges: [
        { node: { id: '1' } },
      ],
    };

    createHostMock.mockReset();
    wrapper = shallow(<HostList hosts={data} createHost={createHostMock}/>);
  });

  it('should render correctly with no hosts', () => {
    data.edges = [];
    const tree = renderer
      .create(<HostList hosts={data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with hosts', () => {
    const tree = renderer
      .create(<HostList hosts={data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should open the dialog by clicking ListItem', () => {
    expect(wrapper.find('Dialog').prop('open')).toBe(false);
    wrapper.find('ListItem').simulate('click');
    expect(wrapper.find('Dialog').prop('open')).toBe(true);
  });

  it('should close the dialog by calling function passed to HostInputForm', () => {
    wrapper.find('ListItem').simulate('click');
    wrapper.find('HostInputForm').prop('onCancel')();
    expect(wrapper.find('Dialog').prop('open')).toBe(false);
  });

  it('should call props.createHost and close Dialog by calling function passed to HostInputForm', () => {
    wrapper.find('ListItem').simulate('click');
    wrapper.find('HostInputForm').prop('onSubmit')('yay');
    expect(createHostMock).toHaveBeenCalledWith({ variables: 'yay' });
    expect(wrapper.find('Dialog').prop('open')).toBe(false);
  });
});
