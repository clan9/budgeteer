import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';
import Header from './Header';

export const AddExpensePage = ({ addExpense, history, user, auth }) => {
  if (!user && !auth) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <Header />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add an Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            onSubmit={expense => {
              addExpense(expense);
              history.push('/dash');
            }}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading,
  auth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addExpense }
)(AddExpensePage);
