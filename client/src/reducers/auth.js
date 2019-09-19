import { FETCH_USER, FETCH_USER_FAILED } from '../actions/types';

const initialAuthState = {
  user: null,
  isAuthenticated: null,
  loading: true
};

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        loading: false
      };
    case FETCH_USER_FAILED:
      return { ...state, user: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};
