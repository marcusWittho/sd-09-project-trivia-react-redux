import { GET_TOKEN } from '../actions';

const GAME_INITIAL_STATE = {
  token: {},
};

function game(state = GAME_INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    default:
      return state;
  }
};

export default game;