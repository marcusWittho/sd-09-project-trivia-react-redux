import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE,
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS_FAILURE,
} from './actionTypes';
import { getUserToken, getQuestions } from '../services/api';

const requestToken = () => ({ type: REQUEST_TOKEN });

const requestTokenSuccess = (token) => ({
  type: REQUEST_TOKEN_SUCCESS,
  token,
});

const requestTokenFailure = (error) => ({
  type: REQUEST_TOKEN_FAILURE,
  error,
});

export function fetchPlayerToken() {
  return (dispatch) => {
    dispatch(requestToken());

    return getUserToken()
      .then(
        (data) => dispatch(requestTokenSuccess(data.token)),
        (error) => dispatch(requestTokenFailure(error.message)),
      );
  };
}

const requestQuestions = () => ({ type: REQUEST_QUESTIONS });

const requestQuestionSuccess = (questions) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  questions,
});

const requestQuestionFailure = (error) => ({
  type: REQUEST_QUESTIONS_FAILURE,
  error,
});

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(requestQuestions());

    return getQuestions()
      .then(
        (data) => dispatch(requestQuestionSuccess(data)),
        (error) => dispatch(requestQuestionFailure(error.message)),
      );
  };
}
