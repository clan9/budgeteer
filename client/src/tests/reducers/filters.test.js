import filtersReducer from '../../reducers/filters';
import moment from 'moment';
import {
  SET_TEXT_FILTER,
  SET_START_DATE,
  SET_END_DATE,
  SORT_BY_AMOUNT,
  SORT_BY_DATE
} from '../../actions/types';

describe('Filters Reducer tests', () => {
  it('should set up the default filters state', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      text: '',
      sortBy: 'date',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    });
  });

  it('should set the text filter', () => {
    const text = 'Hello';
    const action = { type: SET_TEXT_FILTER, text };
    const state = filtersReducer(undefined, action);

    expect(state.text).toBe(text);
  });

  it('should set start date filter', () => {
    const startDate = moment(0).add('3 days');
    const action = { type: SET_START_DATE, startDate };
    const state = filtersReducer(undefined, action);

    expect(state.startDate).toEqual(startDate);
  });

  it('should set the end date filter', () => {
    const endDate = moment(0).add('4 days');
    const action = { type: SET_END_DATE, endDate };
    const state = filtersReducer(undefined, action);

    expect(state.endDate).toEqual(endDate);
  });

  it('should set sortBy filter to amount', () => {
    const action = { type: SORT_BY_AMOUNT };
    const state = filtersReducer(undefined, action);

    expect(state.sortBy).toBe('amount');
  });

  it('should set sortBy filter to date', () => {
    const initialState = {
      text: '',
      sortBy: 'amount',
      startDate: moment(0),
      endDate: moment(0).add('1 day')
    };

    const action = { type: SORT_BY_DATE };

    const state = filtersReducer(initialState, action);

    expect(state.sortBy).toBe('date');
  });
});
