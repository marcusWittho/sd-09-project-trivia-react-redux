import { GAME_QUESTIONS, LOADING_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: {},
  loading: true,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_QUESTIONS:
    return {
      ...state,
      loading: action.payload,
      questions: action.gameQuestions,
    };
  case LOADING_QUESTIONS:
    return {
      ...state,
      loading: action.payload,
    };
  default:
    return state;
  }
};

export default questions;
