import { GET_PLAYER_NAME, GET_PLAYER_EMAIL,
  GET_TOKEN, UPDATE_INDEX, UPDATE_SCORE_ASSERTIONS } from '../actions/actionTypes';

const INITIAL_PLAYER_STATE = {
  name: '',
  token: '',
  email: '',
  score: 0,
  index: 0,
  assertions: 0,
  isAnswered: false,
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
      isAnswered: false,
    };
  case UPDATE_SCORE_ASSERTIONS:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + action.assertions,
      isAnswered: true,
    };
  default:
    return state;
  }
};

export default player;
