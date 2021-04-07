<<<<<<< HEAD
const GET_TOKEN_API_BASE = 'https://opentdb.com/api_';

const getToken = () => (
  fetch(`${GET_TOKEN_API_BASE}_token.php?command=request`)
    .then((response) => (
      response
        .json()
        .then((json) => (
          response.ok ? PromiseRejectionEvent.resolve(json) : Promise.reeject(json)))
    ))
);

export default getToken;
=======
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
>>>>>>> f2cd80e65a9d3494aa763a8566d71d54a91b7a89
