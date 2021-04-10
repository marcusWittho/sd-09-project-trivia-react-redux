import { LOGIN } from '../actions';

const INITIAL_STATE = { email: '', name: '', score: 0, assertions: 0 };

function login(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case LOGIN:
    return {
      name: actions.name,
      email: actions.email,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}

export default login;
