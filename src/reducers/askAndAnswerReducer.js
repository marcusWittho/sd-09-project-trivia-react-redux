import { SAVE_ASKS } from '../actions';

const INITIAL_STATE = [];

const askAndAnswersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_ASKS:
    return [...action.asks];
  default:
    return state;
  }
};

export default askAndAnswersReducer;
