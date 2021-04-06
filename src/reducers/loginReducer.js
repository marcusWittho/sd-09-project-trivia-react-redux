import { LOGIN, TOKEN } from '../actions';

const INITIAL_STATE = {
  username: '',
  email: '',
  token: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return { ...state, token: action.token };
  case LOGIN:
    return { ...state,
      username: action.payload.username,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default loginReducer;
