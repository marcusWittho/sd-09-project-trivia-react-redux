import { GETQUESTIONS_ACTION, LOADING_ACTION } from '../actions/apiTriviaAction';
import { SETPLAYER_ACTION, ASSERTIONS_ACTION } from '../actions/gameAction';

const INITIAL_STATE = {
  questions: {},
  loading: true,
  disabledQuest: false,
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING_ACTION:
    return { ...state, loading: true };
  case GETQUESTIONS_ACTION:
    return { ...state, questions: action.questions, loading: false };
  case SETPLAYER_ACTION:
    return { ...state, player: { ...action.player } };
  case ASSERTIONS_ACTION:
    return { ...state,
      player: { ...state.player,
        assertions: state.player.assertions + 1,
        score: state.player.score + action.score } };
  default:
    return state;
  }
};

export default gameReducer;
