/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TargetInputForm from '../../src/components/TargetInputForm';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('@material-ui/core/Select', () => 'Select');
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem');
jest.mock('@material-ui/core/InputLabel', () => 'InputLabel');
jest.mock('@material-ui/core/FormControl', () => 'FormControl');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');

describe('TargetInputForm', () => {
  let onCancelFunc;
  let onSubmitFunc;
  let hosts;
  let wrapper;

  beforeEach(() => {
    onCancelFunc = jest.fn();
    onSubmitFunc = jest.fn();
    hosts = [
      { id: '1', name: 'aaa' },
      { id: '2', name: 'bbb' },
    ];
    wrapper = shallow(<TargetInputForm
      onCancel={onCancelFunc}
      onSubmit={onSubmitFunc}
      hosts={hosts}
      defaultHost={hosts[0]}
    />);
  });

  it('should render correctly with minimum props', () => {
    const tree = renderer
      .create(<TargetInputForm onCancel={onCancelFunc} onSubmit={onSubmitFunc} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with hosts prop with no default selection', () => {
    const tree = renderer
      .create((
        <TargetInputForm onCancel={onCancelFunc} onSubmit={onSubmitFunc} hosts={hosts} />
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with hosts prop and default selection', () => {
    const tree = renderer
      .create((
        <TargetInputForm
          onCancel={onCancelFunc}
          onSubmit={onSubmitFunc}
          hosts={hosts}
          defaultHost={hosts[1]}
        />
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onCancel prop function by clicking on Cancel button', () => {
    wrapper.find('Button').at(0).simulate('click');
    expect(onCancelFunc).toHaveBeenCalledTimes(1);
  });

  /* eslint-disable object-curly-newline */
  const validCases = [
    { name: 'name', componentType: 'TextField', componentIndex: 0, newValue: 'ABC' },
    { name: 'from', componentType: 'TextField', componentIndex: 1, newValue: 'DEF' },
    { name: 'to', componentType: 'TextField', componentIndex: 2, newValue: 'GHI' },
  ];
  validCases.forEach((field) => {
    it(`'${field.name}' field can be changed`, () => {
      wrapper.find(field.componentType).at(field.componentIndex).simulate('change', { target: { value: field.newValue } });
      expect(wrapper.find(field.componentType).at(field.componentIndex).prop('value')).toBe(field.newValue);
      expect(wrapper.find(field.componentType).at(field.componentIndex).prop('error')).toBe(false);
    });
  });

  it('\'host\' field can be changed', () => {
    const field = { name: 'host', componentType: 'Select', componentIndex: 0, newValue: '2' };
    expect(wrapper.find(field.componentType).at(field.componentIndex).prop('value')).toBe('1');
    wrapper.find(field.componentType).at(field.componentIndex).simulate('change', { target: { value: field.newValue } });
    expect(wrapper.find(field.componentType).at(field.componentIndex).prop('value')).toBe(field.newValue);
  });

  it('should call onSubmit prop function if all field values are valid', () => {
    const expectedArgument = {};
    validCases.forEach((field) => {
      wrapper.find(field.componentType).at(field.componentIndex).simulate('change', { target: { value: field.newValue } });
      expectedArgument[field.name] = String(field.newValue);
    });
    wrapper.find('Select').at(0).simulate('change', { target: { value: '2' } });
    expectedArgument.hostId = '2';

    wrapper.find('Button').at(1).simulate('click');
    expect(onSubmitFunc).toHaveBeenCalledWith(expectedArgument);
  });

  const errorCases = [
    { name: 'name', componentType: 'TextField', componentIndex: 0, newValue: '' },
    { name: 'from', componentType: 'TextField', componentIndex: 1, newValue: '' },
    { name: 'to', componentType: 'TextField', componentIndex: 2, newValue: '' },
  ];
  errorCases.forEach((field) => {
    it(`'${field.name}' field displays error if invalid value given when clicking Submit`, () => {
      wrapper.find(field.componentType).at(field.componentIndex).simulate('change', { target: { value: field.newValue } });
      expect(wrapper.find(field.componentType).at(field.componentIndex).prop('value')).toBe(field.newValue);
      wrapper.find('Button').at(1).simulate('click');
      expect(wrapper.find(field.componentType).at(field.componentIndex).prop('error')).toBe(true);
      expect(onSubmitFunc).not.toHaveBeenCalled();
    });
  });

  it('should be able to set errors on all fields at once', () => {
    errorCases.forEach((field) => {
      wrapper.find(field.componentType).at(field.componentIndex).simulate('change', { target: { value: field.newValue } });
    });
    wrapper.find('Button').at(1).simulate('click');
    errorCases.forEach((field) => {
      expect(wrapper.find(field.componentType).at(field.componentIndex).prop('error')).toBe(true);
    });
    expect(onSubmitFunc).not.toHaveBeenCalled();
  });
  /* eslint-enable object-curly-newline */
});
