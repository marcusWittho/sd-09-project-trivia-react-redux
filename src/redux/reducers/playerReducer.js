import { SET_USER_NAME, SET_USER_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_NAME:
    return {
      ...state,
      name: action.nameInput,
    };
  case SET_USER_EMAIL:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default playerReducer;
