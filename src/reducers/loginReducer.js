const INITIAL_STATE = {
  token: '',
  email: '',
  name: '',
  hash: '',
  questions: [],
  loading: true,
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
  case 'REQUEST_QUESTIONS':
    return {
      ...state,
      questions: action.questions,
      loading: false,
    };
  case 'LOADING':
    return { ...state, loading: true };
  default:
    return state;
  }
};

export default loginReducer;
