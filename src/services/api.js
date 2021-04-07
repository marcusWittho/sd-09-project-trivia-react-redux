export async function fetchAPI(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getToken() {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetchAPI(endpoint);
  return data.token;
}

export async function getQuestions() {
  const questions = 5;
  const token = await getToken();
  const endpoint = `https://opentdb.com/api.php?amount=${questions}&token=${token}`;
  const data = await fetchAPI(endpoint);
  return data.results;
}

export async function getGravatar(hash) {
  const endpoint = `https://www.gravatar.com/avatar/${hash}`;
  const data = await fetch(endpoint);
  console.log(data);
  return data.url;
}
