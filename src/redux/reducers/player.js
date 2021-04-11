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
      player: { ...state.player, name: state.name, gravatarEmail: state.email },
    });
  case SCORE:
    return ({ ...state,
      player: { ...state.player, score: action.score + state.score },
      score: action.score + state.score,
    });
  case CORRECT:
    return ({ ...state,
      player: { ...state.player, assertions: state.rightAnswers + 1 },
      rightAnswers: parseInt(state.rightAnswers, 10) + 1,
    });
  case TIME_COUNTER:
    return ({ ...state,
      counter: action.counter });
  case WRONG:
    return ({ ...state,
      wrongAnswers: parseInt(state.wrongAnswers, 10) + 1,
    });
  case CORRECT:
    return ({ ...state,
      rightAnswers: parseInt(state.rightAnswers, 10) + 1,
    });
  case WRONG:
    return ({ ...state,
      wrongAnswers: parseInt(state.wrongAnswers, 10) + 1,
    });
  default:
    return state;
  }
};

export default player;
