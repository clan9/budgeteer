import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

describe('AddExpenseComponent', () => {
  let addExpense, history;

  beforeEach(() => {
    addExpense = jest.fn();
    history = { push: jest.fn() };
  });

  it('should render AddExpensePage correctly', () => {
    const user = true;
    const auth = true;
    const wrapper = shallow(<AddExpensePage user={user} auth={auth} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect to home page if user not logged in', () => {
    const user = false;
    const auth = false;
    const wrapper = shallow(<AddExpensePage user={user} auth={auth} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle onSubmit', () => {
    const user = true;
    const auth = true;
    const wrapper = shallow(
      <AddExpensePage
        user={user}
        auth={auth}
        history={history}
        addExpense={addExpense}
      />
    );

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/dash');
  });
});
