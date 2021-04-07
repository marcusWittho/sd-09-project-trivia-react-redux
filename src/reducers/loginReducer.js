const INITIAL_STATE = {
  token: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RESQUEST_TOKEN':
    return { token: action.token };
  default:
    return state;
  }
};

export default loginReducer;
