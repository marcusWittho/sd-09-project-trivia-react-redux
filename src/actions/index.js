import { REQUEST_QUESTIONS } from '../services/index';

export const saveUserToken = (userToken) => ({
  type: 'TOKEN',
  userToken,
});

const setQuestions = (questions) => ({
  type: 'SET_QUESTIONS',
  questions,
});

export const saveRequest = () => ({
  type: 'REQ_QUESTIONS',
});

export const getQuestions = (token) => async (dispatch) => {
  const data = await REQUEST_QUESTIONS(token);
  dispatch(setQuestions(data));
  return data;
};
