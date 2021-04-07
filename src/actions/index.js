import {
  QUESTIONS_SUCCESS,
  QUESTIONS_FAILURE,
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
