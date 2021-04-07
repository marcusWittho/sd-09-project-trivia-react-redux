const reqApi = () => {
    fetch('https://opentdb.com/api_token.php?command=request')
    .then((resposta) => resposta.json())
    .then((token) => token)
}

export default reqApi;