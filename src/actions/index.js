export const addLoginInfo = ({ email, name }) => (
  { type: 'ADD_LOGIN_INFO', email, name });

export const addToken = (token) => ({ type: 'ADD_TOKEN', token });
