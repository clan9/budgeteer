import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

describe('ExpenseForm', () => {
  let onSubmitSpy = jest.fn();

  it('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render ExpenseForm with expense data', () => {
    const expense = expenses[1];
    const wrapper = shallow(<ExpenseForm expense={expense} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render error message for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('error').length).toBeGreaterThan(0);
  });

  it('should set description on input change', () => {
    const value = 'New Description';
    const wrapper = shallow(<ExpenseForm />);

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value } });

    expect(wrapper.state('description')).toBe(value);
  });

  it('should set note on textarea change', () => {
    const value = 'New Note';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('textarea').simulate('change', { target: { value } });

    expect(wrapper.state('note')).toBe(value);
  });

  it('should set amount if amount is a valid value ', () => {
    const value = '5.50';
    const wrapper = shallow(<ExpenseForm />);

    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value } });

    expect(wrapper.state('amount')).toBe(value);
  });

  it('should not set amount if amount is an invalid value', () => {
    const value = '5.555';
    const wrapper = shallow(<ExpenseForm />);

    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value } });
    expect(wrapper.state('amount')).toBe(0);
  });

  it('should call onSubmit prop for valid form submission', () => {
    const wrapper = shallow(
      <ExpenseForm onSubmit={onSubmitSpy} expense={expenses[0]} />
    );

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
      description: expenses[0].description,
      amount: expenses[0].amount,
      note: expenses[0].note,
      createdAt: expenses[0].createdAt
    });
  });

  it('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find(SingleDatePicker).prop('onDateChange')(now);

    // OR if not importing SingleDatePicker into this file:
    // wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);

    expect(wrapper.state('createdAt')).toEqual(now);
  });

  it('should set calendarFocus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });

    expect(wrapper.state('calendarFocused')).toEqual(focused);
  });
});
