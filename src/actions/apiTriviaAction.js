export const GETQUESTIONS_ACTION = 'GETQUESTIONS_ACTION';

export const getQuestions = (questions) => ({ type: GETQUESTIONS_ACTION, questions });

export function getThunkTrivia(token) {
  localStorage.setItem('token', token);
  return async (dispatch) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();
    return dispatch(getQuestions(result.results));
  };
}

export const LOADING_ACTION = 'LOADING_ACTION';

export const loading = () => ({ type: LOADING_ACTION });

export function getThunkToken() {
  return async (dispatch) => {
    dispatch(loading());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json()
        .then((result) => dispatch(getThunkTrivia(result.token))));
  };
}
