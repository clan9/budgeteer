import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  GET_EXPENSES
} from '../actions/types';

const initialExpensesState = [];

export default (state = initialExpensesState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.expense];
    case GET_EXPENSES:
      return action.expenses;
    case EDIT_EXPENSE:
      return state.map(expense => {
        if (expense._id === action.expense._id) {
          return { ...expense, ...action.expense };
        } else {
          return expense;
        }
      });
    case REMOVE_EXPENSE:
      return state.filter(expense => expense._id !== action._id);
    default:
      return state;
  }
};
