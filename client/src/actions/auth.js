import axios from 'axios';
import { FETCH_USER, FETCH_USER_FAILED } from './types';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/auth/user');

    const user = res.data._id;

    dispatch({
      type: FETCH_USER,
      user
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAILED
    });
  }
};
