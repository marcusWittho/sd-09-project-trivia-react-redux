export const TYPE_LOGIN = 'TYPE_LOGIN';
export const USER_INFO = 'USER_INFO';

export const loginAction = (token) => ({ type: TYPE_LOGIN, value: token });

export const userInfoAction = (name, email) => ({
  type: USER_INFO,
  name,
  email,
});
