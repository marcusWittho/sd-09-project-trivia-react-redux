import {
  QUESTIONS_SUCCESS,
  QUESTIONS_FAILURE,
  FETCHING_QUESTIONS,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  questions: [],
  isFetching: false,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCHING_QUESTIONS:
    return ({
      ...state,
      isFetching: true,
    });
  case QUESTIONS_SUCCESS:
    return ({
      ...state,
      questions: action.questions,
      isFetching: false,
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
