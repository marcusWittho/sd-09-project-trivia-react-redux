import { GETQUESTIONS_ACTION, LOADING_ACTION } from '../actions/apiTriviaAction';
import { DISABLEQUEST_ACTION, NEXTQUEST_ACTION } from '../actions/gameAction';

const INITIAL_STATE = {
  questions: {},
  loading: true,
  disabledQuest: false,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING_ACTION:
    return { ...state, loading: true };
  case GETQUESTIONS_ACTION:
    return { ...state, questions: action.questions, loading: false };
  case DISABLEQUEST_ACTION:
    return { ...state, disabledQuest: true };
  case NEXTQUEST_ACTION:
    return { ...state, disabledQuest: false };
  default:
    return state;
  }
};

export default gameReducer;
