import {
  QUESTIONS_SUCCESS,
  QUESTIONS_FAILURE,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  questions: [],
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS_SUCCESS:
    return ({
      ...state,
      questions: action.questions,
    });
  case QUESTIONS_FAILURE:
    return ({
      ...state,
      questionsError: action.error,
    });
  default:
    return state;
  }
};

export default triviaReducer;
