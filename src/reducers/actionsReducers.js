const initialState = {
  isFetching: true,
  questions: [],
};

function actionsReducer(state = initialState, action) {
  switch (action.type) {
  case 'TOKEN':
    return { ...state, token: action.token };
  case 'SET_QUESTIONS':
    return { ...state, questions: action.questions, isFetching: false };
  default: return state;
  }
}

export default actionsReducer;
