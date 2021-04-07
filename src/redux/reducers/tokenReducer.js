import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  token: '',
  error: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_TOKEN_SUCCESS:
    return {
      ...state,
      isFetching: false,
      token: action.data.token,
    };
  case REQUEST_TOKEN_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default tokenReducer;
