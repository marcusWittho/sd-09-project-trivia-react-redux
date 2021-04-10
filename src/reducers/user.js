import { ADD_USER_INFO, SET_SCORE } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const addUserInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return {
      ...state,
      ...action.payload,
    };
  case SET_SCORE:
    return { ...state, score: action.payload };
  default:
    return state;
  }
};

export default addUserInfoReducer;
