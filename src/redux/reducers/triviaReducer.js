import {
  REQUEST_TOKEN,
  SET_GRAVATAR_IMAGE,
  SET_PLAYER_NAME,
  REQUEST_QUESTIONS,
} from '../actions';

const INITIAL_TRIVIA_STATE = {
  token: {},
  questions: {},
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
  case REQUEST_QUESTIONS:
    return { ...state,
      questions: action.questions,
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
