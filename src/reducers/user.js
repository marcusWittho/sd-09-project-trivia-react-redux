const initialState = { name: '', email: '', token: '' };

export default function user(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, name: action.name, email: action.email, token: action.token };
  default:
    return state;
  }
}
