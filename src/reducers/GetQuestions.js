import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = { questions: [] };

function saveQuestions(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: [...actions.result],
    };
  default:
    return state;
  }
}

export default saveQuestions;
