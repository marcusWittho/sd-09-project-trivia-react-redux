const tokenEndPoint = 'https://opentdb.com/api_token.php?command=request';

const fetchApiToken = () => (
  fetch(tokenEndPoint)
    .then((reponse) => reponse.json())
    .catch((error) => console.log(error))
);

export default fetchApiToken;
