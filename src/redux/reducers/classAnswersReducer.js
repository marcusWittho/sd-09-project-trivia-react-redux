import { CLEAR_CLASS_REDUCER, SET_CLASS_REDUCER } from '../actions/actionTypes';

const initClass = 'button-answer';

const INITIAL_STATE = {
  correctClass: initClass,
  wrongClass: initClass,
};

const classAnswersReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CLASS_REDUCER:
    return {
      correctClass: 'correct-answer button-answer',
      wrongClass: 'wrong-answer button-answer',
    };
  case CLEAR_CLASS_REDUCER:
    return {
      correctClass: initClass,
      wrongClass: initClass,
    };
  default:
    return state;
  }
};

export default classAnswersReducers;
