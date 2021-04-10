import { GET_GRAVATAR, SET_CONFIG } from '../actions';

const INITIAL_STATE = {
  gravatar: '',
  name: '',
  config: 'https://opentdb.com/api.php?amount=5',
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_GRAVATAR:
    return {
      ...state,
      gravatar: action.hashEmail,
      name: action.name,
    };
  case SET_CONFIG:
    return {
      ...state,
      config: action.config,
    };
  default:
    return state;
  }
};

export default trivia;
