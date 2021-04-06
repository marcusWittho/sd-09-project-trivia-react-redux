const INITIAL_STATE = {
  email: '',
  name: '',
};

const LOGIN = 'LOGIN';

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state };
  default:
    return state;
  }
}

export default user;
