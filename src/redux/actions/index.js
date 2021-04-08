import { opentdbApi, questionsApi } from '../services/Api';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_NAME_EMAIL = 'SET_NAME_EMAIL';
export const SET_GRAVATAR = 'SET_GRAVATAR';
export const SET_QUESTIONS = 'SET_QUESTIONS';

const setTokenCode = (token) => ({
  type: SET_TOKEN,
  token,
});

const setQuestions = (results) => ({
  type: SET_QUESTIONS,
  results,
});

export const getToken = () => async (dispatch) => {
  const data = await opentdbApi();
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
