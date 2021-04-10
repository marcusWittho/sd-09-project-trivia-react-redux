import {
  REQUEST_TOKEN,
  SET_GRAVATAR_IMAGE,
  SET_PLAYER_NAME,
  REQUEST_QUESTIONS,
  SET_ASSERTIONS,
  SET_SCORE,
  RESET_GAME,
} from '../actions';

const INITIAL_TRIVIA_STATE = {
  token: {},
  questions: {},
  avatar: '',
  name: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
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
      player: { ...state.player, name: action.name },
    };
  case SET_SCORE:
    return {
      ...state,
      player: { ...state.player, score: state.player.score + action.points },
    };
  case RESET_GAME:
    return {
      ...state,
      player: { ...state.player, score: 0, assertions: 0 } };
  case SET_ASSERTIONS:
    return { ...state,
      player: {
        ...state.player,
        assertions: state.player.assertions + 1 } };
  default:
    return state;
  }
};

export default triviaReducer;
