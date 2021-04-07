import {
  ADD_NEW_QUESTIONS,
  DECREASE_TIME, QUESTION_REQUEST,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  timer: 30,
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
  case DECREASE_TIME:
    return {
      ...state,
      timer: state.timer - 1,
    };
  default:
    return state;
  }
};

export default questionsReducer;
