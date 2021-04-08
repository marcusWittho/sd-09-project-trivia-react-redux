import { REQUEST_TOKEN, REQUEST_QUESTIONS } from '../actions';

const INITIAL_TRIVIA_STATE = {
  token: {},
  questions: {},
};

const triviaReducer = (state = INITIAL_TRIVIA_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case REQUEST_QUESTIONS:
    return { ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
};

export default triviaReducer;
