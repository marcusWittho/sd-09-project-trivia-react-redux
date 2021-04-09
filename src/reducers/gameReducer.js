import { SAVE_GAME_DATA, RECEIVE_ERROR_GAME_API } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isLoading: true,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_GAME_DATA:
    return {
      ...state,
      questions: action.questions,
      isLoading: false,
    };
  case RECEIVE_ERROR_GAME_API:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
}

export default gameReducer;