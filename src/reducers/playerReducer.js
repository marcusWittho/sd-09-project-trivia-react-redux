import { GET_PLAYER_NAME, GET_TOKEN } from '../actions/actionTypes';

const INITIAL_PLAYER_STATE = {
  player: {},
  token: '',
};

const player = (state = INITIAL_PLAYER_STATE, action) => {
  switch (action.type) {
  case GET_PLAYER_NAME:
    return {
      ...state,
      player: action.player,
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default player;
