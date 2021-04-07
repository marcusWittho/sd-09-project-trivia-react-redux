import fetchApiToken from '../../services';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECIVE_TOKEN = 'RECIVE_TOKEN';

const reciveToken = (token) => ({
  type: RECIVE_TOKEN,
  token,
});

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestToken());
    const response = await fetchApiToken();
    return dispatch(reciveToken(response));
  };
}
