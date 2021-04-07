import {
  INITIAL_REQUEST,
  SUCCESS_REQUEST,
  ERROR_REQUEST } from '../Actions/actionsType';

const INITIAL_STATE = {
  questions: {},
  isFetching: false,
  error: {},
};

const getQuestionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INITIAL_REQUEST:
    return {
      ...state,
      isFetching: action.isFetching,
    };
  case SUCCESS_REQUEST:
    return {
      ...state,
      questions: action.data,
    };
  case ERROR_REQUEST:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default getQuestionsReducer;
