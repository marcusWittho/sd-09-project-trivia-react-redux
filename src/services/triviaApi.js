export const getToken = async () => {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(endPoint);
  const result = await response.json();
  return result.token;
};

export const getAnswer = async (number, token) => {
  const endPoint = `https://opentdb.com/api.php?amount=${number}&token=${token}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};
