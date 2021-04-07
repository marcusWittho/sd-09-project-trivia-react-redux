import { ACTIVE_LOGIN, ADD_GRAVATAR, ADD_SCORE } from '../actions/actionTypes';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
    validLogin: false,
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIVE_LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        validLogin: true,
      },
    };
  case ADD_GRAVATAR:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.name,
        gravatarEmail: action.gravatarEmail,
        validLogin: true,
      },
    };
  case ADD_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.points,
      },
    };
  default:
    return state;
  }
};

export default playerReducer;
