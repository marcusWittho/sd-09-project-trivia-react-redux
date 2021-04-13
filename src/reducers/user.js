const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
  settingsActive: '',
};

const ADD_LOGIN_INFO = 'ADD_LOGIN_INFO';
const ADD_TOKEN = 'ADD_TOKEN';
const CONFIGURE_QUESTIONS = 'CONFIGURE_QUESTIONS';

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_LOGIN_INFO:
    return { ...state, email: action.email, name: action.name };
  case ADD_TOKEN:
    return { ...state, token: action.token };
  case CONFIGURE_QUESTIONS:
    return { ...state, settingsActive: action.payload };
  default:
    return state;
  }
}

export default user;
