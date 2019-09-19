import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

describe('Expenses Reducer test', () => {
  it('should set the default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual([]);
  });

  it('should set state to all expenses fetched', () => {
    const action = {
      type: 'GET_EXPENSES',
      expenses
    };
    const state = expensesReducer(undefined, action);

    expect(state).toEqual(expenses);
  });

  it('should add a new expense with provided values', () => {
    const newExpense = {
      id: 4,
      description: 'test one',
      amount: 654,
      note: 'test note',
      createdAt: moment(0)
        .add('4 months')
        .valueOf()
    };

    const action = { type: 'ADD_EXPENSE', expense: newExpense };

    const state = expensesReducer(expenses, action);

    expect(state[3]).toEqual(newExpense);
  });

  it('should edit an existing expense', () => {
    const action = {
      type: 'EDIT_EXPENSE',
      expense: {
        _id: '2',
        description: 'Rent for last month'
      }
    };

    const state = expensesReducer(expenses, action);

    expect(state[1].description).toBe('Rent for last month');
  });

  it('should not edit an expense when invalid id provided', () => {
    const action = {
      type: 'EDIT_EXPENSE',
      expense: {
        _id: '999',
        note: 'Should not work'
      }
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
  });

  it('should remove an existing expense', () => {
    const state = expensesReducer(expenses, {
      type: 'REMOVE_EXPENSE',
      _id: expenses[0]._id
    });

    expect(state).toEqual([expenses[1], expenses[2]]);
  });

  it('should not remove an expense if invalid id provided', () => {
    const state = expensesReducer(expenses, {
      type: 'REMOVE_EXPENSE',
      _id: '999'
    });

    expect(state).toEqual(expenses);
  });
});
