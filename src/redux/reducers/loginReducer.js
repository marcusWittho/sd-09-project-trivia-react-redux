import { SET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TOKEN:
    return { ...state, token: action.data };
  default:
    return state;
  }
};

export default loginReducer;
