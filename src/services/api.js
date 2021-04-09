export async function getToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
}

export async function getQuestions() {
  const token = await getToken();
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  return data.results;
}

export async function getGravatar(hash) {
  const data = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  return data.url;
}
