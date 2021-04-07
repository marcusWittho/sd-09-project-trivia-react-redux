export const GRAVATAR = 'GRAVATAR';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const FAILED_QUESTIONS_REQUEST = 'FAILED_QUESTIONS_REQUEST';

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

function failedQuestionsRequest(error) {
  return { type: FAILED_QUESTIONS_REQUEST, message: error.message };
}

export function fetchQuestions() {
  const token = localStorage.getItem('token');
  return async (dispatch) => {
    dispatch(requestQuestions());
    const requestResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await requestResponse.json();
    dispatch(getQuestions(response.results));
    dispatch(failedQuestionsRequest(response.results));
    return requestResponse;
  };
}
