import { ADD_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const questions = (
  state = INITIAL_STATE, { type, questions },
) => {
  switch (type) {
  case ADD_QUESTIONS:
    return { questions };
  default:
    return state;
  }
};

export default questions;
