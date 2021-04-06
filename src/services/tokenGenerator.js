const tokenURL = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = () => (
  fetch(tokenURL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error)
);

export default fetchToken;
