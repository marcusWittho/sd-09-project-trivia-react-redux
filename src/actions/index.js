import { REQUEST_QUESTIONS } from '../services/index';

export const saveUserToken = (userToken) => ({
  type: 'TOKEN',
  userToken,
});

export const setPlayerName = (name) => ({
  type: 'SET_PLAYER_NAME',
  name,
});

export const setPlayerAssertions = (assertions) => ({
  type: 'SET_PLAYER_ASSERTIONS',
  assertions,
});

export const setPlayerScore = (score) => ({
  type: 'SET_PLAYER_SCORE',
  score,
});

export const setPlayerEmail = (email) => ({
  type: 'SET_PLAYER_EMAIL',
  email,
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
