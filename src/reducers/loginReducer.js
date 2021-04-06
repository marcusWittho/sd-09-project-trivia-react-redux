import { LOGIN } from '../actions';

const INITIAL_STATE = {
  username: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
