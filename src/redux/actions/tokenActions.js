import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE,
} from './actionTypes';

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const requestTokenSuccess = (data) => ({
  type: REQUEST_TOKEN_SUCCESS,
  data,
});

const requestTokenFailure = (error) => ({
  type: REQUEST_TOKEN_FAILURE,
  error,
});

const fetchToken = () => (
  async (dispatch) => {
    dispatch(requestToken());
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const responseObj = await response.json();
      dispatch(requestTokenSuccess(responseObj));
    } catch (error) {
      dispatch(requestTokenFailure(error));
    }
  }
);

export default fetchToken;
