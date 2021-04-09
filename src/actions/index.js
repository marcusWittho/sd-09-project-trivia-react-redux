export const LOGIN = 'LOGIN';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const PLAYER_RUN_OUT_TIME = 'PLAYER_RUN_OUT_TIME';

export const doLogin = ({ email, name }) => ({
  type: LOGIN,
  email,
  name,
});

export const getQuestionsToStore = (result) => ({
  type: SAVE_QUESTIONS,
  result,
});

export const timeRunOut = (bool) => ({
  type: PLAYER_RUN_OUT_TIME,
  bool,
});
