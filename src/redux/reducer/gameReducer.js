import { GET_QUESTIONS, REQUEST_QUESTIONS } from '../actions';

const initialState = {
  isFetching: true,
  questions: [],
};

function gameReducer(state = initialState, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case GET_QUESTIONS:
    return { ...state, questions: action.questions, isFetching: false };
  default:
    return state;
  }
}

export default gameReducer;
