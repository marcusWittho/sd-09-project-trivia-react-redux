import { LOGIN, CORRECT_ANSWER } from '../actions';

const INITIAL_STATE = { email: '', name: '', score: 0, assertions: 0 };

function login(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case LOGIN:
    return {
      ...state,
      name: actions.name,
      email: actions.email,
    };
  case CORRECT_ANSWER:
    return {
      ...state,
      score: actions.score,
      assertions: actions.assertions,
    };
  default:
    return state;
  }
}

export default login;
