import {
  REQUEST_TRIVIA,
  GET_TRIVIA,
  FAILED_TRIVIA_REQUEST,
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  questions: [],
  error: '',
};

const triviaReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_TRIVIA:
    return { ...state, isFetching: true };
  case GET_TRIVIA:
    return { ...state, isFetching: false, questions: payload };
  case FAILED_TRIVIA_REQUEST:
    return { ...state, isFetching: false, error: payload };
  default:
    return state;
  }
};

export default triviaReducer;
