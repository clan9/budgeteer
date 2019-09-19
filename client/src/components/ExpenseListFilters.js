import 'react-dates/initialize';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate
} from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends Component {
  state = { calendarFocused: null };

  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = e => {
    e.target.value === 'date'
      ? this.props.sortByDate()
      : this.props.sortByAmount();
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search Expenses"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDateId="start"
              endDateId="end"
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(
  mapStateToProps,
  {
    setStartDate,
    setEndDate,
    setTextFilter,
    sortByAmount,
    sortByDate
  }
)(ExpenseListFilters);
