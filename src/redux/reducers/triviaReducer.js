import { REQUEST_TOKEN } from '../actions';

const INITIAL_TRIVIA_STATE = {
  token: {},
};

const triviaReducer = (state = INITIAL_TRIVIA_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default triviaReducer;
