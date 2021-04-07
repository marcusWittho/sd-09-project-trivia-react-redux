import { GET_QUESTIONS, REQUEST_QUESTIONS, FAILED_QUESTIONS_REQUEST } from '../actions';

const initialState = {
  isFetching: false,
  questions: [],
};

function gameReducer(state = initialState, action) {
  console.log(action.questions);
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case GET_QUESTIONS:
    return { ...state, questions: action.questions, isFetching: false };
  case FAILED_QUESTIONS_REQUEST:
    return { ...state, error: action.message, isFetching: false };
  default:
    return state;
  }
}

export default gameReducer;
