export async function getToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
}

export async function getQuestions(cat, dif, typ) {
  const tkn = await getToken();
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${tkn}${cat}${dif}${typ}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results;
}

export async function getGravatar(hash) {
  const data = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  return data.url;
}
