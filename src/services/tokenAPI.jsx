const getToken = async () => {
  const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await fetchToken.json();
  return response;
};

export default getToken;
