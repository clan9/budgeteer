import axios from 'axios';
import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  GET_EXPENSES
} from './types';

// Add a new expense
export const addExpense = (expense = {}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(expense);
  const res = await axios.post('/api/expenses', body, config);

  // console.log(res.data);
  // console.log(typeof res.data._id);

  const { description, note, amount, createdAt, _id } = res.data;

  dispatch({
    type: ADD_EXPENSE,
    expense: {
      description,
      note,
      amount,
      createdAt,
      _id
    }
  });
};

// Get a user's expenses
export const getExpenses = () => async dispatch => {
  const res = await axios.get('api/expenses');
  const expenses = res.data;
  // console.log(expenses);
  dispatch({
    type: GET_EXPENSES,
    expenses
  });
};

// Edit an expense
export const editExpense = (_id, updates) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(updates);
  const res = await axios.patch(`/api/expenses/${_id}`, body, config);

  // console.log(res.data);

  dispatch({
    type: EDIT_EXPENSE,
    expense: res.data
  });
};

// Delete an expense
export const removeExpense = _id => async dispatch => {
  await axios.delete(`/api/expenses/${_id}`);

  dispatch({
    type: REMOVE_EXPENSE,
    _id
  });
};
