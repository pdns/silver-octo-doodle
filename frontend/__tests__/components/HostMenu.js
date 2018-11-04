/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import HostMenu from '../../src/components/HostMenu';

jest.mock('@material-ui/core/Menu', () => 'Menu');
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/ListItemIcon', () => 'ListItemIcon');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/MoreVert', () => 'MoreVertIcon');
jest.mock('@material-ui/icons/Add', () => 'AddIcon');
jest.mock('mdi-material-ui/Magnify', () => 'MagnifyIcon');

describe('HostMenu', () => {
  it('should render correctly with required props', () => {
    const tree = renderer
      .create(<HostMenu onCreate={() => ({})} onView={() => ({})} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
