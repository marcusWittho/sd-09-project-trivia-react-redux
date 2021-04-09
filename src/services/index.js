const TRIVIA_TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
const TRIVIA_QUESTIONS_AMOUNT = 5;
const TRIVIA_EXPIRED_TOKEN_CODE = 3;

const getTriviaQuestionsUrl = (questionsAmount, token) => (
  `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`
);

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

const fetchTriviaQuestions = async (token) => {
  const apiUrl = getTriviaQuestionsUrl(TRIVIA_QUESTIONS_AMOUNT, token);
  return fetchGenericAPI(apiUrl);
};

export const getTriviaQuestions = async () => {
  const tokenIsInStorage = retrieveTokenFromStorage();
  const token = !tokenIsInStorage ? await fetchTriviaToken() : tokenIsInStorage;
  const response = await fetchTriviaQuestions(token);
  const tokenIsExpired = response.response_code === TRIVIA_EXPIRED_TOKEN_CODE;
  if (tokenIsExpired) return fetchTriviaQuestions(await fetchTriviaToken());
  return response;
};
