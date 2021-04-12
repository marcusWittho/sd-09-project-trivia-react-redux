import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
      score: action.score,
    };
  default:
    return state;
  }
}
