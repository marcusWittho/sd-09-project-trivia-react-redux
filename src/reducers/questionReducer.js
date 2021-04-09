import { GET_QUESTIONS } from '../actions/actionTypes';

const INITIAL_QUEST_STATE = {
  questions: [],
};

const data = (state = INITIAL_QUEST_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
};

export default data;
