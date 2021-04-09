import { TRIVIA_REQUEST } from '../actions';

const INITIAL_STATE = {
  triviaObject: {},
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TRIVIA_REQUEST:
    return {
      ...state,
      triviaObject: action.triviaObject,
    };

  default:
    return state;
  }
};

export default trivia;
