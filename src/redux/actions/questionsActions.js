import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS_FAILURE,
} from './actionTypes';

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const requestQuestionsSuccess = (data) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  data,
});

const requestQuestionsFailure = (error) => ({
  type: REQUEST_QUESTIONS_FAILURE,
  error,
});

const fetchQuestions = (token) => (
  async (dispatch) => {
    dispatch(requestQuestions());
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const responseObj = await response.json();
      dispatch(requestQuestionsSuccess(responseObj.results));
    } catch (error) {
      dispatch(requestQuestionsFailure(error));
    }
  }
);

export default fetchQuestions;
