async function fetchToken() {
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => data.token)
    .catch((error) => error);
}

export default fetchToken;
