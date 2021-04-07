import { SAVE_USER_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_USER_DATA:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
}

export default loginReducer;
