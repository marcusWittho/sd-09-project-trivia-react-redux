import { SET_DATA_GAME } from '../actions';

const INITIAL_STATE = {
  data: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_DATA_GAME:
    return { ...state, data: action.data };
  default:
    return state;
  }
};

export default gameReducer;
