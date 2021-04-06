const fetchTriviaToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();

    localStorage.setItem('token', result.token);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default fetchTriviaToken;
