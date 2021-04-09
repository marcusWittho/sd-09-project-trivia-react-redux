export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const IS_LOADING = 'IS_LOADING';

const addQuestions = (payload) => ({
  type: ADD_QUESTIONS,
  payload,
  isLoading: false,
});

const loadQuestions = () => ({
  type: IS_LOADING,
});

export const fetchQuestions = () => async (dispatch) => {
  dispatch(loadQuestions());
  const token = localStorage.getItem('token');
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = await fetch(url);
  const { results } = await data.json();
  dispatch(addQuestions(results));
};
