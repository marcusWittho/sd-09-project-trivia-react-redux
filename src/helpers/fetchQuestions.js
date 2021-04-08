async function fetchQuestions(token) {
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => error);
}

export default fetchQuestions;
