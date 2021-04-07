import { LOGIN, SCORE } from '../actions/player';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return ({ ...state,
      email: action.email,
      name: action.name,
    });
  case SCORE:
    return ({ ...state,
      score: action.score,
    });
  default:
    return state;
  }
};

export default player;
