import { ADD_QUESTIONS } from '../actions/game';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  questions: [],
  timer: 30,
  questionPos: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, questions: [...state.questions, ...action.payload] };
  default:
    return state;
  }
};

export default game;
