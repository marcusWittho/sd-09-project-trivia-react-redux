const initialState = { name: '', email: '', totalScore: 0 };

export default function user(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, name: action.name, email: action.email };
  case 'SET_SCORE':
    return { ...state, totalScore: state.totalScore + action.score };
  default:
    return state;
  }
}
