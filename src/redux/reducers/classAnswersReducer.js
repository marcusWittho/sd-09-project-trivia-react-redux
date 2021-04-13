import { CLEAR_CLASS_REDUCER, SET_CLASS_REDUCER } from '../actions/actionTypes';

const initClass = 'option-answer';

const INITIAL_STATE = {
  correctClass: initClass,
  wrongClass: initClass,
};

const classAnswersReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CLASS_REDUCER:
    return {
      correctClass: 'correct-answer',
      wrongClass: 'wrong-answer',
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
