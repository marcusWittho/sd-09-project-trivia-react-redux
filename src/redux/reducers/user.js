const INITIAL_STATE = {
  username: '',
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CLICK_PLAY':
    return {
      username: action.credentials.username,
      email: action.credentials.email };
  default:
    return state;
  }
}

export default userReducer;
