export const LOGIN = 'LOGIN';
export const playerLogin = (email, name) => ({
  type: LOGIN,
  email,
  name,
});
