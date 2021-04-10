import { opentdbApi, questionsApi } from '../services/Api';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_NAME_EMAIL = 'SET_NAME_EMAIL';
export const SET_GRAVATAR = 'SET_GRAVATAR';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_NEXT = 'SET_NEXT';
export const SET_SELECTED_ANSWER = 'SET_SELECTED_ANSWER';
export const SET_SCORE = 'SET_SCORE';

const setTokenCode = (token) => ({
  type: SET_TOKEN,
  token,
});

const setQuestions = (results) => ({
  type: SET_QUESTIONS,
  results,
});

export const setNext = () => ({
  type: SET_NEXT,
});

export const getToken = () => async (dispatch) => {
  const data = await opentdbApi();
  console.log(data);
  localStorage.setItem('token', data);
  dispatch(setTokenCode(data));
};

export const getQuestions = () => async (dispatch) => {
  const data = await questionsApi();
  dispatch(setQuestions(data));
};

export const setNameAndEmail = (name, email) => ({
  type: SET_NAME_EMAIL,
  name,
  email,
});

export const setSelectedAnswer = (selectedAnswer) => ({
  type: SET_SELECTED_ANSWER,
  selectedAnswer,
});

export const setScore = (points) => ({
  type: SET_SCORE,
  points,
});
