import {
  SET_TOKEN,
  SET_NAME_EMAIL,
  SET_QUESTIONS,
  SET_NEXT,
  SET_SELECTED_ANSWER,
  SET_SCORE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  score: 0,
  results: [],
  next: false,
  selectedAnswer: null,
};

function actionsReducer(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
  case SET_TOKEN:
    return { ...state, token: action.token };
  case SET_NAME_EMAIL:
    return { ...state,
      name: action.name,
      email: action.email };
  case SET_QUESTIONS:
    return { ...state, results: action.results };
  case SET_NEXT:
    return { ...state, next: !state.next };
  case SET_SELECTED_ANSWER:
    return { ...state, selectedAnswer: action.selectedAnswer };
  case SET_SCORE:
    return { ...state, score: action.points };
  default: return state;
  }
}

export default actionsReducer;
