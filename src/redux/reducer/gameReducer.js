import { GET_QUESTIONS, REQUEST_QUESTIONS, TIME_OVER, TIME_STARTER } from '../actions';

const initialState = {
  isFetching: true,
  questions: [],
  timeOver: false,
};

function gameReducer(state = initialState, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case GET_QUESTIONS:
    return { ...state, questions: action.questions, isFetching: false };
  case TIME_OVER:
    return { ...state, timeOver: true };
  case TIME_STARTER:
    return { ...state, timeOver: false };
  default:
    return state;
  }
}

export default gameReducer;
