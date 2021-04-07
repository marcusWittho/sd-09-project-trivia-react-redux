import {
  QUESTIONS_SUCCESS,
  QUESTIONS_FAILURE,
  LOGIN_EMAIL,
  LOGIN_NAME,

} from './actionsTypes';
import fetchTrivia from '../services/triviaApi';

export const successQuestions = (data) => ({
  type: QUESTIONS_SUCCESS,
  questions: data.results,
});

export const failureQuestions = (error) => ({
  type: QUESTIONS_FAILURE,
  error,
});

export function questionsThunk() {
  return (dispatch) => (
    fetchTrivia()
      .then((data) => dispatch(successQuestions(data)))
      .catch((error) => dispatch(failureQuestions(error)))
  );
}

export const loginEmail = (email) => ({
  type: LOGIN_EMAIL,
  email,
});

export const loginName = (name) => ({
  type: LOGIN_NAME,
  name,
});
