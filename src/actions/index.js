import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE,
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
} from './actionTypes';
import { getUserToken, getQuestions } from '../services/api';

// TOKEN
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
        (error) => dispatch(requestTokenFailure(error.response_message)),
      );
  };
}

// QUESTIONS
const requestQuestions = () => ({ type: REQUEST_QUESTIONS });

const requestQuestionSuccess = (questions) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  questions,
});

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(requestQuestions());

    return getQuestions()
      .then(
        (data) => dispatch(requestQuestionSuccess(data)),
      );
  };
}
