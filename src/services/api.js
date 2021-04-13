const TRIVIA_TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
const TRIVIA_EXPIRED_TOKEN_CODE = 3;

const getTriviaQuestionsUrl = (options) => {
  const optionsJoinedWithValues = Object.entries(options)
    .map((option) => option.join('='));
  const urlOptions = optionsJoinedWithValues.join('&');
  return `https://opentdb.com/api.php?${urlOptions}`;
};

const fetchGenericAPI = async (url) => {
  const request = await fetch(url);
  const response = await request.json();
  return response;
};

const fetchTriviaToken = async () => (
  fetchGenericAPI(TRIVIA_TOKEN_URL)
    .then(({ token }) => {
      localStorage.setItem('token', token);
      return token;
    }));

const retrieveTokenFromStorage = () => {
  const tokenInStorage = Object.keys(localStorage).includes('token');
  if (tokenInStorage) {
    return localStorage.getItem('token');
  }
  return null;
};

const fetchTriviaQuestionsWithOptions = async (options) => {
  const apiUrl = getTriviaQuestionsUrl(options);
  return fetchGenericAPI(apiUrl);
};

const getTriviaQuestionsWithOptions = async (options) => {
  const tokenIsInStorage = retrieveTokenFromStorage();
  const token = !tokenIsInStorage ? await fetchTriviaToken() : tokenIsInStorage;
  const response = await fetchTriviaQuestionsWithOptions({ ...options, token });
  const tokenIsExpired = response.response_code === TRIVIA_EXPIRED_TOKEN_CODE;
  if (tokenIsExpired) {
    const newToken = await fetchTriviaToken();
    return fetchTriviaQuestionsWithOptions({ ...options, token: newToken });
  }
  return response;
};

export default getTriviaQuestionsWithOptions;
