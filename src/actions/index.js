import fetchTrivaToken from '../service/triviaApi';

export const requestTriviaToken = (token) => ({
  type: 'RESQUEST_TOKEN',
  token,
});

export const fetchTrivaApi = () => (dispach) => {
  fetchTrivaToken()
    .then((triviaApiResponse) => dispach(requestTriviaToken(triviaApiResponse)));
};

export const requestUserInfo = (email, name, hash) => ({
  type: 'REQUEST_USER_INFO',
  email,
  name,
  hash,
});
