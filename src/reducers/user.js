import { ADD_USER_INFO, ANSWER_CORRECT } from '../actions/types';
import calcNewScore from '../services/score';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const userInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return {
      ...state,
      ...action.payload,
    };
  case ANSWER_CORRECT:
    return {
      ...state,
      ...calcNewScore(action.payload, state),
    };
  default:
    return state;
  }
};

export default userInfoReducer;
