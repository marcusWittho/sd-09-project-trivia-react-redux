import { GETQUESTIONS_ACTION, LOADING_ACTION } from '../actions/apiTriviaAction';

const INITIAL_STATE = {
  questions: {},
  loading: true,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING_ACTION:
    return { ...state, loading: true };
  case GETQUESTIONS_ACTION:
    return { ...state, questions: action.questions, loading: false };
  default:
    return state;
  }
};

export default gameReducer;
