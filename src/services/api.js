const URL = 'https://opentdb.com/api_token.php?command=request';

const tokenAPI = async () => {
  try {
    const response = await fetch(URL);
    const token = await response.json();
    return token.token;
  } catch (error) {
    console.log(error);
  }
};

export default tokenAPI;
