import { LOGIN } from '../actions';

const INITIAL_STATE = { email: '', name: '' };

function login(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case LOGIN:
    return {
      name: actions.name,
      email: actions.email,
    };
  default:
    return state;
  }
}

export default login;
