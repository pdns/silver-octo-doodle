/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HostInputForm from '../../src/components/HostInputForm';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');

describe('HostInputForm', () => {
  let onCancelFunc;
  let onSubmitFunc;
  let wrapper;

  beforeEach(() => {
    onCancelFunc = jest.fn();
    onSubmitFunc = jest.fn();
    wrapper = shallow(<HostInputForm onCancel={onCancelFunc} onSubmit={onSubmitFunc} />);
  });

  it('should render correctly with required props', () => {
    const tree = renderer
      .create(<HostInputForm onCancel={onCancelFunc} onSubmit={onSubmitFunc} />)
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
    { name: 'user', componentType: 'TextField', componentIndex: 1, newValue: 'DEF' },
    { name: 'address', componentType: 'TextField', componentIndex: 2, newValue: 'GHI' },
    { name: 'port', componentType: 'TextField', componentIndex: 3, newValue: 789 },
    { name: 'identityFile', componentType: 'TextField', componentIndex: 4, newValue: 'MNO' },
  ];
  validCases.forEach((field) => {
    it(`'${field.name}' field can be changed`, () => {
      wrapper.find(field.componentType).at(field.componentIndex).simulate('change', { target: { value: field.newValue } });
      expect(wrapper.find(field.componentType).at(field.componentIndex).prop('value')).toBe(field.newValue);
      expect(wrapper.find(field.componentType).at(field.componentIndex).prop('error')).toBe(false);
    });
  });

  it('should call onSubmit prop function if all field values are valid', () => {
    const expectedArgument = {};
    validCases.forEach((field) => {
      wrapper.find(field.componentType).at(field.componentIndex).simulate('change', { target: { value: field.newValue } });
      expectedArgument[field.name] = String(field.newValue);
    });
    wrapper.find('Button').at(1).simulate('click');
    expect(onSubmitFunc).toHaveBeenCalledWith(expectedArgument);
  });

  const errorCases = [
    { name: 'name', componentType: 'TextField', componentIndex: 0, newValue: '' },
    { name: 'user', componentType: 'TextField', componentIndex: 1, newValue: '' },
    { name: 'address', componentType: 'TextField', componentIndex: 2, newValue: '' },
    { name: 'port', componentType: 'TextField', componentIndex: 3, newValue: NaN },
    { name: 'identityFile', componentType: 'TextField', componentIndex: 4, newValue: '' },
  ];
  errorCases.forEach((field) => {
    it(`'${field.name}' field does not call onSubmit prop and sets error to true if field is empty when clicking Submit`, () => {
      wrapper.find(field.componentType).at(field.componentIndex).simulate('change', { target: { value: field.newValue } });
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
