import { SAVE_LOGIN } from '../actions/actionTypes';

const INITIAL_STATE = { emailInput: '', nameInput: '' };

function loginReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_LOGIN:
    return { ...state, ...payload };
  default:
    return state;
  }
}

export default loginReducer;