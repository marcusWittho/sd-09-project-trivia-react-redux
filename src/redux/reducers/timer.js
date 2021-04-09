import { STOP_TIME, TIMES_UP, GET_SECONDS } from '../actions';

const INITIAL_STATE = {
  timesUp: false,
  stopTime: false,
  seconds: 0,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMES_UP:
    return { ...state, timesUp: true, seconds: action.seconds };
  case STOP_TIME:
    return { ...state, stopTime: true };
  case GET_SECONDS:
    return { ...state, seconds: action.seconds };
  default:
    return state;
  }
};

export default timer;
