import { REQUEST_QUESTIONS, REQUEST_TOKEN, UPDATE_INDEX } from '../actions/game';

const INITIAL_STATE = {
  token: {},
  loading: false,
  questions: [],
  index: 0,
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
  case UPDATE_INDEX:
    return { ...state,
      index: action.index,
    };
  default:
    return state;
  }
};

export default game;
