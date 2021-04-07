const endpoint = 'https://opentdb.com/api_token.php?command=request';

const requestToken = async () => {
  const response = await fetch(endpoint);
  const tokenObject = await response.json();

  return tokenObject.token;
};

export default requestToken;
