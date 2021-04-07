import {
  REQUEST_TOKEN,
  SET_GRAVATAR_IMAGE,
} from '../actions';

const INITIAL_TRIVIA_STATE = {
  token: {},
  avatar: '',
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
  default:
    return state;
  }
};

export default triviaReducer;
