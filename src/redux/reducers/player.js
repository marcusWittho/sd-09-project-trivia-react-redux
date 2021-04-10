import { LOGIN, SCORE, WRONG, CORRECT } from '../actions/player';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
  rightAnswers: 0,
  wrongAnswers: 0,
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
