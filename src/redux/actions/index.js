export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const requestToken = (token) => ({
  type: REQUEST_TOKEN,
  token,
});

export const fetchToken = () => (
  async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const token = await response.json();
      return dispatch(requestToken(token));
    } catch (error) {
      console.log(error);
    }
  }
);
