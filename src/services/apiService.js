export default function requestTokenID() {
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => data.token);
}
