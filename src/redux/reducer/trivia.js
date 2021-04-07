import { GRAVATAR } from '../actions';

const INITIAL_STATE = {
  gravatar: '',
  isLoading: false,
  token: '',
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GRAVATAR:
    return {
      ...state,
      gravatar: action.gravatar,
    };
  default:
    return state;
  }
};

export default trivia;
