import { combineReducers } from 'redux';
import { TYPE_LOGIN, USER_INFO } from '../actions/action';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
  token: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TYPE_LOGIN:
    return ({
      ...state,
      token: action.value,
    });
  default:
    return state;
  }
}

function userInfoReducer(state = INITIAL_STATE.player, action) {
  switch (action.type) {
  case USER_INFO:
    return ({
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    });
  default: return state;
  }
}

const rootReducer = combineReducers({
  loginReducer,
  userInfoReducer,
});

export default rootReducer;
