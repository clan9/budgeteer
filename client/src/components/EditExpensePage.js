import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';
import Header from './Header';

export const EditExpensePage = props => {
  if (!props.user && !props.auth) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <Header />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={props.expense}
            onSubmit={expense => {
              props.editExpense(props.expense._id, expense);
              props.history.push('/dash');
            }}
          />
          <button
            className="button button--secondary"
            onClick={e => {
              props.removeExpense(props.expense._id);
              props.history.push('/dash');
            }}
          >
            Remove Expense
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  expense: state.expenses.find(
    expense => expense._id === ownProps.match.params.id
  ),
  user: state.auth.user,
  auth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { editExpense, removeExpense }
)(EditExpensePage);
