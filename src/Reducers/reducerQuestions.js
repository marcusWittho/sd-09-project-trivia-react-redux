import { SET_EXPIRED, SET_QUESTIONS, SET_LOADING } from '../Actions/setQuestions';

const INITIAL_STATE = {
  questions: [],
  expired: false,
  loading: true,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTIONS:
    return { ...state, questions: action.questions, loading: false };
  case SET_EXPIRED:
    return { ...state, expired: false };
  case SET_LOADING:
    return { ...state, loading: true };
  default:
    return state;
  }
};

export default questions;
