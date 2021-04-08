import { TOKEN } from '../actions';

const INITIAL_TOKEN = '';

const token = (state = INITIAL_TOKEN, action) => {
  switch (action.type) {
  case TOKEN:
    return action.token;
  default:
    return state;
  }
};

export default token;
