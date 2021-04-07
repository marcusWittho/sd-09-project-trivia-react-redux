const opentdbApi = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json()
    .then((data) => data.token)
    .catch((error) => (
      console.log(error)
    )));

export default opentdbApi;
