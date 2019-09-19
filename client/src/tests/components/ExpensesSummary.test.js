import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

describe('ExpensesSummary component', () => {
  it('should correctly render ExpensesSummary for one expense', () => {
    const wrapper = shallow(
      <ExpensesSummary expenseCount={1} expenseTotal={12456} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should correctly render ExpensesSummary for multiple expenses', () => {
    const wrapper = shallow(
      <ExpensesSummary expenseCount={3} expenseTotal={56795} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
