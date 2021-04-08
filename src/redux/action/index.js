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
