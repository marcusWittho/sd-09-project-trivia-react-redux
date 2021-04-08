const INITIAL_STATE = {
  token: '',
  email: '',
  name: '',
  hash: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RESQUEST_TOKEN':
    return { ...state, token: action.token };
  case 'REQUEST_USER_INFO':
    return {
      ...state,
      email: action.email,
      name: action.name,
      hash: action.hash,
    };
  default:
    return state;
  }
};

export default loginReducer;
