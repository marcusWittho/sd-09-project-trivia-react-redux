import { RESET_TIMER, UPDATE_TIMER } from '../actions/actionTypes';

const INITIAL_STATE = {
  timer: 30,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_TIMER:
    return {
      timer: state.timer - 1,
    };

  case RESET_TIMER:
    return {
      timer: 30,
    };

  default:
    return state;
  }
};

export default timerReducer;
