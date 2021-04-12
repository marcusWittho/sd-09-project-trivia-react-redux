import { ADD_QUESTIONS, IS_LOADING, DECREASE_TIME,
  INCREASE_SCORE, NEXT_QUESTION, IS_ANSWERED } from '../actions/game';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  questions: [],
  timer: 30,
  questionPos: 0,
  isLoading: true,
  answered: false,
};

const scoreDifficulty = { easy: 1, medium: 2, hard: 3 };
const TEN = 10;
const scoreToBeAdded = (assert, diff, timer) => assert
  * (TEN + (timer * scoreDifficulty[diff]));

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INCREASE_SCORE:
    localStorage.setItem('state', JSON.stringify({ player: { score: state.score } }));
    return { ...state,
      assertions: state.assertions + action.payload.assert,
      score: state.score
      + scoreToBeAdded(action.payload.assert, action.payload.difficulty, state.timer),
    };
  case ADD_QUESTIONS:
    return { ...state,
      questions: [...state.questions, ...action.payload],
      isLoading: false,
    };
  case IS_LOADING:
    return { ...state, isLoading: true };
  case IS_ANSWERED:
    return { ...state, answered: true };
  case DECREASE_TIME:
    return { ...state, timer: state.timer - 1 };
  case NEXT_QUESTION:
    return { ...state, questionPos: state.questionPos + 1, timer: 30, answered: false };
  default:
    return state;
  }
};

export default game;
