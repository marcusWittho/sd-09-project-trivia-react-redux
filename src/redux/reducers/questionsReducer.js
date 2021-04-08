import {
  FETCH_QUESTION,
  RETURN_QUESTION,
  ERROR_QUESTION,
} from '../actions/actionstype';

const INITIAL_STATE = {
  questions: '',
  error: '',
  isFetching: true,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_QUESTION:
    return ({
      ...state,
      isFetching: true,
    });
  case RETURN_QUESTION:
    return ({
      ...state,
      questions: action.questions,
      isFetching: false,
    });
  case ERROR_QUESTION:
    return ({
      ...state,
      error: action.error,
      isFetching: false,
    });
  default:
    return state;
  }
};

export default questionsReducer;
