import { REQUEST_QUESTION, REQUEST_QUESTION_SUCCESS } from '../actions';

const INITIAL_STATE = {
  loading: true,
  questions: [],
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTION:
    return ({
      ...state,
      loading: action.loading,
    });
  case REQUEST_QUESTION_SUCCESS:
    return ({
      ...state,
      loading: action.loading,
      questions: action.questions,
    });
  default:
    return state;
  }
}

export default reducer;
