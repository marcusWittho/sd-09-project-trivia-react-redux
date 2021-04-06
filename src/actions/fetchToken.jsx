import getToken from '../services/tokenAPI';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const requestTokenSuccess = (token) => ({
  type: REQUEST_TOKEN_SUCCESS,
  token,
});

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestToken());
    const { token } = await getToken();
    dispatch(requestTokenSuccess(token));
  };
}
