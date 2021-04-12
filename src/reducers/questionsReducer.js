import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  questions: [],
  responseCode: -1,
  questionNumber: 0,
  isFetching: false,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_QUESTIONS_SUCCESS: {
    const { response_code: responseCode, results } = action.questions;
    return {
      ...state,
      questions: results,
      responseCode,
      isFetching: false,
    };
  }
  default:
    return state;
  }
};

export default questionsReducer;
