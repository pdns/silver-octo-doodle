/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import HostInputForm from '../../src/components/HostInputForm';

jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');

describe('HostInputForm', () => {
  it('should render correctly with required props', () => {
    const tree = renderer
      .create(<HostInputForm onCancel={() => ({})} onSubmit={() => ({})} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
