export async function fetchToken() {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await request.json();
  return data.token;
}

export async function fetchQuestions(token) {
  const request = await fetch(`https://opentdb.com/api.php?amount=1&token=${token}`);
  const data = await request.json();
  return data.results;
}
