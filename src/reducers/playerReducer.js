import { GET_PLAYER_NAME,
  GET_PLAYER_EMAIL, GET_TOKEN, UPDATE_INDEX, COUNT_POINTS } from '../actions/actionTypes';

const INITIAL_PLAYER_STATE = {
  name: '',
  token: '',
  email: '',
  score: 0,
  index: 0,
};

const player = (state = INITIAL_PLAYER_STATE, action) => {
  switch (action.type) {
  case GET_PLAYER_NAME:
    return {
      ...state,
      name: action.name,
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case GET_PLAYER_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  case UPDATE_INDEX:
    return {
      ...state,
      index: action.index,
    };
  case COUNT_POINTS:
    return {
      ...state,
      score: action.score + 1,
    };
  default:
    return state;
  }
};

export default player;
