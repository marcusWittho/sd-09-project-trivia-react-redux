const tokenURL = 'https://opentdb.com/api_token.php?command=request';

export const tokenAPI = async () => {
  try {
    const request = await fetch(tokenURL);
    const token = await request.json();
    return token.token;
  } catch (error) {
    console.log(error);
  }
};

export async function questionsAPI(token) {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await request.json();
  return data.results;
};
