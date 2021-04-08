import {
  SET_TOKEN,
  SET_NAME_EMAIL,
  SET_QUESTIONS,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  score: 0,
  results: [],
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
  default: return state;
  }
}

export default actionsReducer;
