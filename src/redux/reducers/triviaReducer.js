import {
  REQUEST_TOKEN,
  SET_GRAVATAR_IMAGE,
  SET_PLAYER_NAME,
} from '../actions';

const INITIAL_TRIVIA_STATE = {
  token: {},
  avatar: '',
  name: '',
};

const triviaReducer = (state = INITIAL_TRIVIA_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case SET_GRAVATAR_IMAGE:
    return {
      ...state,
      avatar: action.avatar,
    };
  case SET_PLAYER_NAME:
    return {
      ...state,
      name: action.name,
    };
  default:
    return state;
  }
};

export default triviaReducer;
