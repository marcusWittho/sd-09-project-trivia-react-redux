import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  token: '',
  error: '',
  isFetching: false,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_TOKEN_SUCCESS:
    return {
      token: action.token,
      isFetching: false,
    };
  case REQUEST_TOKEN_FAILURE:
    return {
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default playerReducer;
