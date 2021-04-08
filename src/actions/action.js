export const TYPE_LOGIN = 'TYPE_LOGIN';
export const USER_INFO = 'USER_INFO';
export const QUESTION_ADD = 'QUESTION_ADD';
export const RUN_TIMER = 'RUN_TIMER';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const loginAction = (token) => ({ type: TYPE_LOGIN, value: token });

export const userInfoAction = (name, email) => ({
  type: USER_INFO,
  name,
  email,
});

export const questions = (question) => ({ type: QUESTION_ADD, value: question });

export const runTimer = (value) => ({ type: RUN_TIMER, value });

export const updateScore = (value) => ({ type: UPDATE_SCORE, value });
