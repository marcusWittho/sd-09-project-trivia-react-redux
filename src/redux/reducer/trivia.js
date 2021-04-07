import { GET_GRAVATAR } from '../actions';

const INITIAL_STATE = {
  gravatar: '',
  name: '',
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_GRAVATAR:
    return {
      ...state,
      gravatar: action.hashEmail,
      name: action.name,
    };
  default:
    return state;
  }
};

export default trivia;
