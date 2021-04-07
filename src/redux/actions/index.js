export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SET_GRAVATAR_IMAGE = 'SET_GRAVATAR_IMAGE';

export const requestToken = (token) => ({
  type: REQUEST_TOKEN,
  token,
});

export const setGravatarImage = (emailHash) => ({
  type: SET_GRAVATAR_IMAGE,
  avatar: `https://www.gravatar.com/avatar/${emailHash}`,
});

export const fetchToken = () => (
  async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const token = await response.json();
      localStorage.setItem('token', token.token);
      return dispatch(requestToken(token));
    } catch (error) {
      console.log(error);
    }
  }
);
