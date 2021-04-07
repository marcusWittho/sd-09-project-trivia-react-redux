import { LOGIN_EMAIL, LOGIN_NAME } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  case LOGIN_NAME:
    return {
      ...state,
      name: action.name,
    };
  default:
    return state;
  }
};

export default loginReducer;
