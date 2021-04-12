export const GETQUESTIONS_ACTION = 'GETQUESTIONS_ACTION';

export const getQuestions = (questions) => ({ type: GETQUESTIONS_ACTION, questions });

export function getThunkTrivia(token, difficulty, category, type) {
  localStorage.setItem('token', token);
  const endpoint = `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&category=${category}&token=${token}&type=${type}`;
  return async (dispatch) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    return dispatch(getQuestions(result.results));
  };
}

export const LOADING_ACTION = 'LOADING_ACTION';

export const loading = () => ({ type: LOADING_ACTION });

export function getThunkToken(difficulty, category, type) {
  return (dispatch) => {
    dispatch(loading());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json()
        .then((result) => (
          dispatch(getThunkTrivia(result.token, difficulty, category, type)))));
  };
}

export const GETCATEGORY_ACTION = 'GETCATEGORY_ACTION';

export const getCategory = (categories) => ({ type: GETCATEGORY_ACTION, categories });

export const getThunkCategory = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const result = await response.json();
  return dispatch(getCategory(Object.values(result.trivia_categories)));
};
