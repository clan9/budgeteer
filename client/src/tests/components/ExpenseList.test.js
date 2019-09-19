import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

describe('ExpenseList component', () => {
  let getExpenses;

  beforeEach(() => {
    getExpenses = jest.fn();
  });

  it('should correctly render a list of expenses', () => {
    const wrapper = shallow(
      <ExpenseList getExpenses={getExpenses} expenses={expenses} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the no-expenses message', () => {
    const wrapper = shallow(
      <ExpenseList getExpenses={getExpenses} expenses={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
