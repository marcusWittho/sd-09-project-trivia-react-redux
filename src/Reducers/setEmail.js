import { SET_EMAIL } from '../Actions';

const INITIAL_STATE = {
  email: '',
};

const email = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default email;
