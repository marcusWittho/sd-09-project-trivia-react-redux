import { TIME_COUNTER, LOGIN, SCORE, WRONG, CORRECT } from '../actions/player';

const INITIAL_STATE = {
  counter: 0,
  email: '',
  name: '',
  rightAnswers: 0,
  score: 0,
  wrongAnswers: 0,
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return ({ ...state,
      email: action.email,
      name: action.name,
    });
  case SCORE:
    return ({ ...state,
      score: action.score,
      player: { ...state.player, score: state.player.score },
    });
  case CORRECT:
    return ({ ...state,
      rightAnswers: parseInt(state.rightAnswers, 10) + 1,
      player: { ...state.player, assertions: state.rightAnswers + 1 },
    });
  case TIME_COUNTER:
    return ({ ...state,
      counter: action.counter });
  case WRONG:
    return ({ ...state,
      wrongAnswers: parseInt(state.wrongAnswers, 10) + 1,
    });
  default:
    return state;
  }
};

export default player;
