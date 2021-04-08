import { PLAYER_DATA } from '../actions';

const INITIAL_STATE = {
  user: '',
  email: '',
  token: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_DATA:
    return { ...state, ...action.data };
  default:
    return state;
  }
};

export default loginReducer;
