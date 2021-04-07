export const REQUEST_API = 'REQUEST_API';
export const triviaRequest = (data) => (
  { type: REQUEST_API, data }
);

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const requestToken = (token) => ({
  type: REQUEST_TOKEN,
  token,
});
