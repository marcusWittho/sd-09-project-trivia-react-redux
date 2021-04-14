import { opentdbApi, questionsApi } from '../services/Api';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_NAME_EMAIL = 'SET_NAME_EMAIL';
export const SET_GRAVATAR = 'SET_GRAVATAR';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_NEXT = 'SET_NEXT';
export const SET_SELECTED_ANSWER = 'SET_SELECTED_ANSWER';
export const SET_SCORE = 'SET_SCORE';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const SET_RANKING = 'SET_RANKING';
export const SET_INIT = 'SET_INIT';

// const setToken = (token) => ({});

// const setQuestions = (results) => ({});

export const setNext = () => ({
  type: SET_NEXT,
});

export const setToken = () => async (dispatch) => {
  const token = await opentdbApi();
  localStorage.setItem('token', token);
  dispatch({
    type: SET_TOKEN,
    token,
  });
  // dispatch(setToken(data));
};

export const setQuestions = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const results = await questionsApi(token);
  dispatch({
    type: SET_QUESTIONS,
    results,
  });
  // dispatch(setQuestions(data));
};

export const setNameAndEmail = (name, email, gravatar) => ({
  type: SET_NAME_EMAIL,
  name,
  email,
  gravatar,
});

export const setSelectedAnswer = (selectedAnswer) => ({
  type: SET_SELECTED_ANSWER,
  selectedAnswer,
});

export const setScore = (points) => ({
  type: SET_SCORE,
  points,
});

export const setRanking = (ranking) => ({
  type: SET_RANKING,
  ranking,
});

export const setAssertions = (assertions) => ({
  type: SET_ASSERTIONS,
  assertions,
});

export const setInit = () => ({
  type: SET_INIT,
});
