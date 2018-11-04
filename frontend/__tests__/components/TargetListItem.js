/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import TargetListItem from '../../src/components/TargetListItem';

jest.mock('react-relay', () => ({
  createFragmentContainer: x => x,
}));

jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/ListItemIcon', () => 'ListItemIcon');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('mdi-material-ui/Target', () => 'TargetIcon');

describe('TargetListItem', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<TargetListItem target={{ name: 'target name' }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
