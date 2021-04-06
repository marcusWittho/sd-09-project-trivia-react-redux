export const opentdb = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json()
    .then((data) => data)
    .catch((error) => (
      console.log(error)
    )));

export default opentdb;
