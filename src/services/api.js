export const getToken = async () => {
  const ENDPOINT_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const ApiResponse = await fetch(ENDPOINT_TOKEN);
  const token = await ApiResponse.json();

  return token.token;
};

const defaultQuant = 5;

export const getQuestions = async (token, quant = defaultQuant) => {
  const ENDPOINT_QUESTIONS = `https://opentdb.com/api.php?amount=${quant}&token=${token}`;
  const ApiResponse = await fetch(ENDPOINT_QUESTIONS);
  const questions = await ApiResponse.json();

  return questions.results;
};
