import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };

  default:
    return state;
  }
};

export default player;
