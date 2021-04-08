import { SET_PLAYER_DATA } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_DATA:
    return {
      ...state,
      ...action.data,
    };
  default:
    return state;
  }
};

export default playerReducer;
