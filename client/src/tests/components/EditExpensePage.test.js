import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

describe('EditExpensePage', () => {
  let user, auth, editExpense, removeExpense, history, wrapper;

  beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
  });

  it('should redirect to home page if user not logged in', () => {
    user = false;
    auth = false;
    wrapper = shallow(<EditExpensePage user={user} auth={auth} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render the EditExpensePage correctly when user logged in', () => {
    user = true;
    auth = true;
    wrapper = shallow(<EditExpensePage user={user} auth={auth} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle onSubmit', () => {
    user = true;
    auth = true;

    wrapper = shallow(
      <EditExpensePage
        user={user}
        auth={auth}
        history={history}
        expense={expenses[1]}
        editExpense={editExpense}
      />
    );
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/dash');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[1]._id, expenses[1]);
  });

  it('should handle removeExpense', () => {
    user = true;
    auth = true;
    wrapper = shallow(
      <EditExpensePage
        user={user}
        auth={auth}
        history={history}
        expense={expenses[1]}
        removeExpense={removeExpense}
      />
    );

    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/dash');
    expect(removeExpense).toHaveBeenLastCalledWith(expenses[1]._id);
  });
});
