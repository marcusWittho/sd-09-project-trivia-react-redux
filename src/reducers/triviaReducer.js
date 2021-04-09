import {
  QUESTIONS_SUCCESS,
  QUESTIONS_FAILURE,
  FETCHING_QUESTIONS,
  TIMER,
  IS_DISABLED,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  questions: [],
  isFetching: false,
  isDisabled: false,
  timer: 30,
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
  case TIMER:
    return ({
      ...state,
      timer: action.time,
    });
  case IS_DISABLED:
    return ({
      ...state,
      isDisabled: action.isDisabled,
    });
  default:
    return state;
  }
};

export default triviaReducer;
