const initialState = { name: '', email: '', score: 0, correct: 0 };

export default function user(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, name: action.name, email: action.email };
  case 'SET_SCORE':
    return { ...state, score: state.score + action.score, correct: state.correct + 1 };
  default:
    return state;
  }
}
