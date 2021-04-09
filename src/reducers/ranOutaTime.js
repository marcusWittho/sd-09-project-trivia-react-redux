import { PLAYER_RUN_OUT_TIME } from '../actions';

const INITIAL_STATE = {
  ranOutOfTime: false,
};

function ranOutaTime(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case PLAYER_RUN_OUT_TIME:
    return {
      ranOutOfTime: actions.bool,
    };
  default:
    return state;
  }
}

export default ranOutaTime;
