import { LOG_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_USER:
    return {
      name: action.name,
      email: action.email,
    };

  default:
    return state;
  }
};

export default loginReducer;
