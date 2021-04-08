export const LOGIN = 'LOGIN';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

export const doLogin = ({ email, name }) => ({
  type: LOGIN,
  email,
  name,
});

export const getQuestionsToStore = (result) => ({
  type: SAVE_QUESTIONS,
  result,
});
