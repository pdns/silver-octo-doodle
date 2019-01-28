/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HostMenu from '../../src/components/HostMenu';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@material-ui/core/Menu', () => 'Menu');
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/ListItemIcon', () => 'ListItemIcon');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/MoreVert', () => 'MoreVertIcon');
jest.mock('@material-ui/icons/Add', () => 'AddIcon');
jest.mock('mdi-material-ui/Magnify', () => 'MagnifyIcon');

describe('HostMenu', () => {
  let onCreateFunc;
  let onViewFunc;
  let wrapper;

  beforeEach(() => {
    onCreateFunc = jest.fn();
    onViewFunc = jest.fn();
    wrapper = shallow(<HostMenu onCreate={onCreateFunc} onView={onViewFunc} />);
  });

  it('should render correctly with required props', () => {
    const tree = renderer
      .create(<HostMenu onCreate={onCreateFunc} onView={onViewFunc} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should set anchorEl on Menu by clicking IconButton', () => {
    expect(wrapper.find('Menu').prop('anchorEl')).toBe(null);
    wrapper.find('IconButton').simulate('click', { currentTarget: 'yay' });
    expect(wrapper.find('Menu').prop('anchorEl')).toBe('yay');
  });

  it('should nullify anchorEl on Menu by calling function passed to Menu.onClose', () => {
    wrapper.find('IconButton').simulate('click', { currentTarget: 'yay' });
    wrapper.find('Menu').simulate('close');
    expect(wrapper.find('Menu').prop('anchorEl')).toBe(null);
  });

  it('should call onCreate prop and nullify anchorEl by clicking on MenuItem for add', () => {
    wrapper.find('IconButton').simulate('click', { currentTarget: 'yay' });
    wrapper.find('MenuItem').at(0).simulate('click');
    expect(onCreateFunc).toHaveBeenCalledTimes(1);
    expect(wrapper.find('Menu').prop('anchorEl')).toBe(null);
  });

  it('should call onView prop and nullify anchorEl by clicking on MenuItem for add', () => {
    wrapper.find('IconButton').simulate('click', { currentTarget: 'yay' });
    wrapper.find('MenuItem').at(1).simulate('click');
    expect(onViewFunc).toHaveBeenCalledTimes(1);
    expect(wrapper.find('Menu').prop('anchorEl')).toBe(null);
  });
});
