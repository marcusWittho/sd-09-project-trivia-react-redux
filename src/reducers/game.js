import { ADD_QUESTIONS, IS_LOADING } from '../actions/game';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  questions: [],
  timer: 30,
  questionPos: 0,
  isLoading: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state,
      questions: [...state.questions, ...action.payload],
      isLoading: false,
    };
  case IS_LOADING:
    return { ...state, isLoading: true };
  default:
    return state;
  }
};

export default game;
