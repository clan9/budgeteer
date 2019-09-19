import {
  SET_TEXT_FILTER,
  SET_START_DATE,
  SET_END_DATE,
  SORT_BY_AMOUNT,
  SORT_BY_DATE
} from './types';

export const setTextFilter = (text = '') => {
  return {
    type: SET_TEXT_FILTER,
    text
  };
};

export const setStartDate = startDate => {
  return {
    type: SET_START_DATE,
    startDate
  };
};

export const setEndDate = endDate => {
  return {
    type: SET_END_DATE,
    endDate
  };
};

export const sortByAmount = () => {
  return { type: SORT_BY_AMOUNT };
};

export const sortByDate = () => {
  return { type: SORT_BY_DATE };
};
