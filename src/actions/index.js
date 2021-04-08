import { REQUEST_QUESTIONS } from '../services/index';

export const saveUserToken = (userToken) => ({
  type: 'TOKEN',
  userToken,
});

const setQuestions = (questions) => ({
  type: 'SET_QUESTIONS',
  questions,
});

export const getQuestions = () => async (dispatch) => {
  const data = await REQUEST_QUESTIONS();
  dispatch(setQuestions(data));
};
