/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import TargetInputForm from '../../src/components/TargetInputForm';

jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('@material-ui/core/Select', () => 'Select');
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem');
jest.mock('@material-ui/core/InputLabel', () => 'InputLabel');
jest.mock('@material-ui/core/FormControl', () => 'FormControl');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');

describe('TargetInputForm', () => {
  it('should render correctly with minimum props', () => {
    const tree = renderer
      .create(<TargetInputForm onCancel={() => ({})} onSubmit={() => ({})} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with hosts prop with no default selection', () => {
    const hosts = [
      { id: '1', name: 'aaa' },
      { id: '2', name: 'bbb' },
    ];
    const tree = renderer
      .create((
        <TargetInputForm
          onCancel={() => ({})}
          onSubmit={() => ({})}
          hosts={hosts}
        />
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with hosts prop and default selection', () => {
    const hosts = [
      { id: '1', name: 'aaa' },
      { id: '2', name: 'bbb' },
    ];
    const tree = renderer
      .create((
        <TargetInputForm
          onCancel={() => ({})}
          onSubmit={() => ({})}
          hosts={hosts}
          defaultHost={hosts[1]}
        />
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
