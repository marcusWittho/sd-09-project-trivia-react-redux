export const TYPE_LOGIN = 'TYPE_LOGIN';
export const USER_INFO = 'USER_INFO';
export const QUESTION_ADD = 'QUESTION_ADD';

export const loginAction = (token) => ({ type: TYPE_LOGIN, value: token });

export const userInfoAction = (name, email) => ({
  type: USER_INFO,
  name,
  email,
});

export const questions = (question) => ({ type: QUESTION_ADD, value: question });
