import { SET_TOKEN } from '../Actions/setLogin';

const INITIAL_STATE = {
  obj: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TOKEN:
    return { ...state, obj: action.obj };
  default:
    return state;
  }
};

export default token;
