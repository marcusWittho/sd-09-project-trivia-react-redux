import { LOGIN, SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_SCORE:
    return { ...state, score: action.score };
  case LOGIN:
    return {
      ...state,
      name: action.username,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default player;
