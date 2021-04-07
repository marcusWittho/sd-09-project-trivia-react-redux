const initialState = { token: '' };

export default function user(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, token: action.token };
  default:
    return state;
  }
}
