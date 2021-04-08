const initialState = { questions: [] };

export default function trivia(state = initialState, action) {
  switch (action.type) {
  case 'SET_QUESTIONS':
    return { ...state, questions: action.questions };
  default:
    return state;
  }
}
