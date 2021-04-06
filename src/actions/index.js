export const LOGIN = 'LOGIN';

export const doLogin = ({ email, name }) => ({
  type: LOGIN,
  email,
  name,
});
