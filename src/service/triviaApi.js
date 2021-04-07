const TRIVIA_API_URL = 'https://opentdb.com/api_token.php?command=request';

const fetchTrivaToken = async () => {
  const response = await fetch(TRIVIA_API_URL);
  const json = await response.json();
  return json;
}

export default fetchTrivaToken;