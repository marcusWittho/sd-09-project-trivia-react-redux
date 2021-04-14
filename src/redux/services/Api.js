export const opentdbApi = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json()
    .then((data) => data.token)
    .catch((error) => (console.log(error))));

export const questionsApi = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((results) => results.json())
  .then(({ results }) => results)
  .catch((error) => (console.log(error)));
