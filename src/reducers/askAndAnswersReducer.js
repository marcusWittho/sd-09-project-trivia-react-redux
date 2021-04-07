import { SAVE_ASKS } from '../actions';

const INITIAL_STATE = [];

const askAndAnswersReducer = (state = INITIAL_STATE, action) => {
  if (action.type === SAVE_ASKS) return [...action.asks];
  return state;
};

export default askAndAnswersReducer;
