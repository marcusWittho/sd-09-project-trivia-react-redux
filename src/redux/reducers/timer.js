const INITIAL_STATE = {
  timer: 30,
  status: 'start',
};

function timerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'DECREMENT_TIMER':
    return { ...state, timer: action.time };

  case 'CHANGE_STATUS':
    return { ...state, status: action.status };

  default:
    return state;
  }
}

export default timerReducer;
