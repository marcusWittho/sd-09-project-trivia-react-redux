import {
  FETCHING_QUESTIONS,
  QUESTIONS_SUCCESS,
  QUESTIONS_FAILURE,
  LOGIN_EMAIL,
  LOGIN_NAME,
  TIMER,
  IS_DISABLED,
} from './actionsTypes';
import fetchTrivia from '../services/triviaApi';

const fetchingQuestions = () => ({
  type: FETCHING_QUESTIONS,
});

const successQuestions = (data) => ({
  type: QUESTIONS_SUCCESS,
  questions: data.results,
});

const failureQuestions = (error) => ({
  type: QUESTIONS_FAILURE,
  error,
});

export function questionsThunk() {
  return (dispatch) => {
    dispatch(fetchingQuestions());
    return fetchTrivia()
      .then((data) => dispatch(successQuestions(data)))
      .catch((error) => dispatch(failureQuestions(error)));
  };
}

export const loginEmail = (email) => ({
  type: LOGIN_EMAIL,
  email,
});

export const loginName = (name) => ({
  type: LOGIN_NAME,
  name,
});

export const timer = (time) => ({
  type: TIMER,
  time,
});

export const isDisabled = (bool) => ({
  type: IS_DISABLED,
  isDisabled: bool,
});
