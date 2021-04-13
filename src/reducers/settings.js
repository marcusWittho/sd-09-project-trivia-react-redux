const initialState = { category: '', difficulty: '', type: '' };

export default function settings(state = initialState, action) {
  switch (action.type) {
  case 'SET_CATEGORY':
    return { ...state, category: action.category };
  case 'SET_DIFFICULTY':
    return { ...state, difficulty: action.difficulty };
  case 'SET_TYPE':
    return { ...state, type: action.questionType };
  default:
    return state;
  }
}
