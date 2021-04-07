import { REQUEST_API, REQUEST_TOKEN } from '../actions/game';

const INITIAL_STATE = {
  questions: [],
  token: {},
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return ({ ...state,
      questions: action.data,
    });
  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default game;
