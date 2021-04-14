import {
  SET_TOKEN,
  SET_NAME_EMAIL,
  SET_QUESTIONS,
  SET_NEXT,
  SET_SELECTED_ANSWER,
  SET_SCORE,
  SET_ASSERTIONS,
  SET_RANKING,
  SET_INIT,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatar: '',
  score: 0,
  assertions: 0,
  results: [],
  next: false,
  selectedAnswer: null,
};

const INITIAL_RANKING = {
  token: '',
  ranking: [],
};

export function actionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_INIT:
    return { ...state, ...INITIAL_STATE };
  case SET_NAME_EMAIL:
    return { ...state,
      name: action.name,
      email: action.email,
      gravatar: action.gravatar };
  case SET_QUESTIONS:
    return { ...state, results: action.results };
  case SET_NEXT:
    return { ...state, next: !state.next };
  case SET_SELECTED_ANSWER:
    return { ...state, selectedAnswer: action.selectedAnswer };
  case SET_SCORE:
    return { ...state, score: action.points };
  case SET_ASSERTIONS:
    return { ...state, assertions: action.assertions };
  default: return state;
  }
}

export function rankingReducer(state = INITIAL_RANKING, action) {
  switch (action.type) {
  case SET_TOKEN:
    return { ...state, token: action.token };
  case SET_RANKING:
    return { ...state, ranking: action.ranking };
  default: return state;
  }
}
