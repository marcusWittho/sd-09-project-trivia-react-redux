const endpoint = 'https://opentdb.com/api_token.php?command=request';

const requestToken = async () => {
  try {
    const response = await fetch(endpoint);
    const tokenObject = await response.json();

    return tokenObject.token;
  } catch (error) {
    console.log(error);
  }
};

export default requestToken;
