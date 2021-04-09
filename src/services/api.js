function triviaTokenRequest() {
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((response) => response.token);
}

export function questionsRequest(token) {
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((response) => response.results);
}

export function gravatarRequest(hash) {
  return fetch(`https://www.gravatar.com/avatar/${hash}`)
    .then((response) => console.log(response));
}

export default triviaTokenRequest;
