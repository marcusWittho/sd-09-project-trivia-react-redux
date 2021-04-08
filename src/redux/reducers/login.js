const INITIAL_STATE = {
  name: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_EMAIL_LOGIN:
    return {};
  default:
    return state;
  }
};

export default loginReducer;
