import { TIMES_UP } from '../actions';

const INITIAL_STATE = {
  timesUp: false,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMES_UP:
    return { timesUp: true };
  default:
    return state;
  }
};

export default timer;
