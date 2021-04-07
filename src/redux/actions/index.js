export const GRAVATAR = 'GRAVATAR';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';

export const gravatarHash = (gravatar) => ({
  type: GRAVATAR,
  gravatar,
});

function requestQuestions() {
  return { type: REQUEST_QUESTIONS };
}

function getQuestions(questions) {
  return { type: GET_QUESTIONS, questions };
}

function fetchQuestions(token) {
  localStorage.setItem('token', token);
  return async (dispatch) => {
    const requestResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await requestResponse.json();
    dispatch(getQuestions(response.results));
    return requestResponse;
  };
}

export function fetchThunkToken() {
  return async (dispatch) => {
    dispatch(requestQuestions());
    const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenObj = await fetchToken.json();
    return dispatch(fetchQuestions(tokenObj.token));
  };
}
