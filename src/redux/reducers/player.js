import { LOGIN } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return ({ ...state,
      email: action.email,
      name: action.name,
    });
  default:
    return state;
  }
};

export default player;