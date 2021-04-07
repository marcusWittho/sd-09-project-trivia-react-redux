import { SET_EXPIRED, SET_QUESTIONS } from '../Actions/setQuestions';

const INITIAL_STATE = {
  questions: [],
  expired: false,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTIONS:
    return { ...state, questions: action.questions };
  case SET_EXPIRED:
    return { ...state, expired: true };
  default:
    return state;
  }
};

export default questions;
