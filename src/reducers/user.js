import { LOGIN } from '../actions/user';

const INITIAL_STATE = {
  email: '',
  nickname: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { email: action.email, nickname: action.nickname };
  default:
    return state;
  }
}

export default user;
