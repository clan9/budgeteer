import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchUser } from '../actions/auth';
import Header from './Header';
import ExpensesSummary from './ExpensesSummary';
import ExpenseListFilters from './ExpenseListFilters';
import ExpenseList from './ExpenseList';
import LoadingPage from './LoadingPage';

export class ExpenseDashboardPage extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderContent() {
    if (this.props.loading) {
      return <LoadingPage />;
    } else if (!this.props.loading && !this.props.user) {
      return <Redirect to="/" />;
    } else {
      return (
        <Fragment>
          <Header />
          <ExpensesSummary />
          <ExpenseListFilters />
          <ExpenseList />
        </Fragment>
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(ExpenseDashboardPage);
