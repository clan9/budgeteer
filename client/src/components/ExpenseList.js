import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExpenses } from '../actions/expenses';
import selectExpenses from '../selectors/selectExpenses';
import ExpenseListItem from './ExpenseListItem';

export class ExpenseList extends Component {
  componentDidMount() {
    this.props.getExpenses();
  }

  render() {
    return (
      <div className="content-container">
        <div className="list-header">
          <div className="hide-on-desktop">Expenses</div>
          <div className="hide-on-mobile">Expenses</div>
          <div className="hide-on-mobile">Amount</div>
        </div>
        <div className="list-body">
          {this.props.expenses.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No expenses</span>
            </div>
          ) : (
            this.props.expenses.map(expense => {
              return <ExpenseListItem key={expense._id} {...expense} />;
            })
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(
  mapStateToProps,
  { getExpenses }
)(ExpenseList);
/*

<div className="content-container">
  <div className="list-header">
    <div className="show-for-mobile">Expenses</div>
    <div className="show-for-desktop">Expense</div>
    <div className="show-for-desktop">Amount</div>
  </div>
  <div className="list-body">
    {props.expenses.length === 0 ? (
      <div className="list-item list-item--message">
        <span>No expenses</span>
      </div>
    ) : (
      props.expenses.map(expense => {
        return <ExpenseListItem key={expense.id} {...expense} />;
      })
    )}
  </div>
</div>;

*/
