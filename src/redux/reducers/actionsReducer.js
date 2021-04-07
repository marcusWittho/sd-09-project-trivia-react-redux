import {
  SET_TOKEN,
  SET_NAME_IMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  score: 0,
};

function actionsReducer(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
  case SET_TOKEN:
    return { ...state, token: action.token };
  case SET_NAME_IMAIL:
    return { ...state,
      name: action.name,
      email: action.email };
  default: return state;
  }
}

export default actionsReducer;
