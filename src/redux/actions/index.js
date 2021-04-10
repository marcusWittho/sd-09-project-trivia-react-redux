export const GET_GRAVATAR = 'GET_GRAVATAR';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const TIME_OVER = 'TIME_OVER';
export const TIME_STARTER = 'TIME_STARTER';
export const SET_CONFIG = 'SET_CONFIG';

export const gravatarHash = (hashEmail, name) => ({
  type: GET_GRAVATAR,
  hashEmail,
  name,
});

function requestQuestions() {
  return { type: REQUEST_QUESTIONS };
}

function getQuestions(questions) {
  return { type: GET_QUESTIONS, questions };
}

function fetchQuestions(URL, token) {
  localStorage.setItem('token', token);
  return async (dispatch) => {
    const requestResponse = await fetch(`${URL}&token=${token}`);
    const response = await requestResponse.json();
    dispatch(getQuestions(response.results));
    return requestResponse;
  };
}

export function fetchThunkToken(URL) {
  return async (dispatch) => {
    dispatch(requestQuestions());
    const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenObj = await fetchToken.json();
    return dispatch(fetchQuestions(URL, tokenObj.token));
  };
}

export const timeOver = () => ({
  type: TIME_OVER,
});

export const timeStarter = () => ({
  type: TIME_STARTER,
});

export const setConfig = (config) => ({
  type: SET_CONFIG,
  config,
});
