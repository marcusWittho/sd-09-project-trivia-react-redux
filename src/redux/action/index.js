import { fetchApiToken, fetchApiQuestions } from '../../services';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECIVE_TOKEN = 'RECIVE_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

const reciveToken = (token) => ({
  type: RECIVE_TOKEN,
  token,
});

const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export function fetchAPI() {
  return async (dispatch) => {
    const response = await fetchApiToken();
    return dispatch(reciveToken(response));
  };
}

export function getQuestions(token) {
  return async (dispatch) => {
    const response = await fetchApiQuestions(token);
    return dispatch(receiveQuestions(response));
  };
}
