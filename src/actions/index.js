export const LOGIN = 'LOGIN';

export const loginAction = (username, email) => ({
  type: LOGIN,
  payload: {
    username,
    email,
  },
});
