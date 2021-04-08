export const ADD_QUESTIONS = 'ADD_QUESTIONS';

const addQuestions = (payload) => ({
  type: ADD_QUESTIONS,
  payload,
});

export const fetchQuestions = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = await fetch(url);
  const { results } = await data.json();
  console.log(results);
  dispatch(addQuestions(results));
};
