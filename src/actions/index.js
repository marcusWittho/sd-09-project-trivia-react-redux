export const LOGIN = 'LOGIN';

export const saveLoginInfo = (email, nickname) => ({
  type: LOGIN,
  email,
  nickname,
});
