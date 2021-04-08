import { REQUEST_QUESTIONS, REQUEST_TOKEN } from '../actions/game';

const INITIAL_STATE = {
  token: {},
  loading: false,
  questions: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return ({ ...state,
      loading: true,
      questions: action.questions,
    });
  case REQUEST_TOKEN:
    return { ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default game;
