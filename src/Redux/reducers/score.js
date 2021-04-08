import { CURRENT_SCORE } from '../actions';

const INITIAL_CURRENT_SCORE_STATE = {
  currentScore: 0,
};

const scoreReducer = (state = INITIAL_CURRENT_SCORE_STATE, action) => {
  switch (action.type) {
  case CURRENT_SCORE:
    return {
      ...state,
      currentScore: action.currentScore + action.score,
    };
  default:
    return state;
  }
};

export default scoreReducer;
