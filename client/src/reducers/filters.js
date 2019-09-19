import moment from "moment";

import {
  SET_TEXT_FILTER,
  SET_START_DATE,
  SET_END_DATE,
  SORT_BY_AMOUNT,
  SORT_BY_DATE
} from "../actions/types";

const initialFiltersState = {
  text: "",
  sortBy: "date",
  startDate: moment().startOf("year"),
  endDate: moment().endOf("month")
};

export default (state = initialFiltersState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return { ...state, text: action.text };
    case SET_START_DATE:
      return { ...state, startDate: action.startDate };
    case SET_END_DATE:
      return { ...state, endDate: action.endDate };
    case SORT_BY_AMOUNT:
      return { ...state, sortBy: "amount" };
    case SORT_BY_DATE:
      return { ...state, sortBy: "date" };
    default:
      return state;
  }
};
