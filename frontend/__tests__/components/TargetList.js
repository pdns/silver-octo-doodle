/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import TargetList from '../../src/components/TargetList';

jest.mock('react-relay', () => ({
  createFragmentContainer: x => x,
}));

jest.mock('@material-ui/core/List', () => 'List');

jest.mock('../../src/components/TargetListItem', () => 'TargetListItem');

describe('TargetList', () => {
  it('should render correctly', () => {
    const host = {
      targets: {
        edges: [
          { node: { id: '1' } },
          { node: { id: '2' } },
        ],
      },
    };
    const tree = renderer
      .create(<TargetList host={host} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
