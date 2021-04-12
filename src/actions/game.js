export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const IS_LOADING = 'IS_LOADING';
export const IS_ANSWERED = 'IS_ANSWERED';
export const DECREASE_TIME = 'DECREASE_TIME';
export const INCREASE_SCORE = 'INCREASE_SCORE';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const increaseScore = (assert, difficulty, score) => ({
  type: INCREASE_SCORE,
  payload: {
    assert,
    difficulty,
    score,
  },
});

export const isAnswered = () => ({
  type: IS_ANSWERED,
});

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

export const decreaseTime = () => ({
  type: DECREASE_TIME,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});
