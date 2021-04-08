const initialState = {
  loading: true,
  questions: [],
};

function actionsReducer(state = initialState, action) {
  switch (action.type) {
  case 'REQ_QUESTIONS':
    return { ...state, loading: true };
  case 'TOKEN':
    return { ...state, token: action.token };
  case 'SET_QUESTIONS':
    return { ...state, questions: action.questions, loading: false };
  default: return state;
  }
}

export default actionsReducer;
