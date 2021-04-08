export const fetchTriviaToken = async () => {
  try {
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const result = await response.json();

    localStorage.setItem('token', result.token);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTriviaQuestions = async (token) => {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
