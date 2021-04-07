const fetchToken = () => {
  const urlToFetch = 'https://opentdb.com/api_token.php?command=request';
  fetch(urlToFetch)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

export default fetchToken;
