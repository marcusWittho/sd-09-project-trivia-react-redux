import GET_PLAYER_NAME from '../actions/actionTypes';

const INITIAL_PLAYER_STATE = {
  player: {},
};

const player = (state = INITIAL_PLAYER_STATE, action) => {
  switch (action.type) {
  case GET_PLAYER_NAME:
    return {
      ...state,
      player: action.player,
    };
  default:
    return state;
  }
};

export default player;
