export const REQUEST_TOKEN = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const objResponse = await response.json();
  const { token } = objResponse;
  return token;
};

export const REQUEST_QUESTIONS = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const objResponse = await response.json();
  return objResponse;
};
