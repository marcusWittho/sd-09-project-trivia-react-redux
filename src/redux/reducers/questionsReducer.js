import { ADD_NEW_QUESTIONS, QUESTION_REQUEST } from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTION_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case ADD_NEW_QUESTIONS:
    return {
      ...state,
      isFetching: false,
      questions: [...action.questions],
    };
  default:
    return state;
  }
};

export default questionsReducer;
