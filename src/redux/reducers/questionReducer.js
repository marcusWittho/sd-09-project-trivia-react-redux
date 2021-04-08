import { RECEIVE_QUESTIONS, REQUEST_QUESTIONS } from '../action';

const INITAL_STATE = {
  questions: {},
};

const questionReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
    };
  case RECEIVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
};

export default questionReducer;
