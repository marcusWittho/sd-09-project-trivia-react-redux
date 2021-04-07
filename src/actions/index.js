import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE,
} from './actionTypes';
import { getUserToken } from '../services/api';

const requestToken = () => ({ type: REQUEST_TOKEN });

const requestTokenSuccess = (token) => ({
  type: REQUEST_TOKEN_SUCCESS,
  token,
});

const requestTokenFailure = (error) => ({
  type: REQUEST_TOKEN_FAILURE,
  error,
});

export default function fetchPlayerToken() {
  return (dispatch) => {
    dispatch(requestToken());

    return getUserToken()
      .then(
        (data) => dispatch(requestTokenSuccess(data.token)),
        (error) => dispatch(requestTokenFailure(error.message)),
      );
  };
}
