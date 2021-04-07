import { combineReducers } from 'redux';
import { TYPE_LOGIN, USER_INFO, QUESTION_ADD } from '../actions/action';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
  token: '',
  questions: [],
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TYPE_LOGIN:
    return ({
      ...state,
      token: action.value,
    });
  default:
    return state;
  }
}

function userInfoReducer(state = INITIAL_STATE.player, action) {
  switch (action.type) {
  case USER_INFO:
    return ({
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    });
  default: return state;
  }
}

function addQuestions(state = INITIAL_STATE.questions, action) {
  switch (action.type) {
  case QUESTION_ADD:
    return ({
      ...state,
      question: action.value,
    });
  default: return state;
  }
}

const rootReducer = combineReducers({
  loginReducer,
  userInfoReducer,
  addQuestions,
});

export default rootReducer;
