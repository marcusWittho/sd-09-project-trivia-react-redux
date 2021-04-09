const initialState = { questions: [], timer: 30 };

export default function trivia(state = initialState, action) {
  switch (action.type) {
  case 'SET_QUESTIONS':
    return { ...state, questions: action.questions };
  case 'SET_TIMER':
    return { ...state, timer: action.timeLeft };
  default:
    return state;
  }
}
