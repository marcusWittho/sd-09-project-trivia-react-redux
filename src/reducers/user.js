const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

const ADD_LOGIN_INFO = 'ADD_LOGIN_INFO';
const ADD_TOKEN = 'ADD_TOKEN';

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_LOGIN_INFO:
    return { ...state, email: action.email, name: action.name };
  case ADD_TOKEN:
    return { ...state, token: action.token };
  default:
    return state;
  }
}

export default user;
