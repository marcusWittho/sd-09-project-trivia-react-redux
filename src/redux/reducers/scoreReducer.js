import { UPDATE_SCORE } from '../actions/actionTypes';

const INITIAL_STATE = { score: 0, assertions: 0 };

function scoreReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case UPDATE_SCORE:
    return { ...state, ...payload, assertions: state.assertions + 1 };
  default:
    return state;
  }
}

export default scoreReducer;
