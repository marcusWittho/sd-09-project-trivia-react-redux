import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS_FAILURE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  questions: {},
  error: '',
  isFetching: false,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.questions,
      isFetching: false,
    };
  case REQUEST_QUESTIONS_FAILURE:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default questionsReducer;
