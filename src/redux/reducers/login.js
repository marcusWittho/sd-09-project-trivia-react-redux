import { SUBMIT_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

const loginUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
      token: action.token,
    };
  default:
    return state;
  }
};

export default loginUser;
