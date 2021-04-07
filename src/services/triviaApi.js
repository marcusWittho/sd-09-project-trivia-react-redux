const triviaURL = 'https://opentdb.com/api.php?amount=5&token=';

const fetchTrivia = () => {
  const token = localStorage.getItem('token');
  return fetch(`${triviaURL}${token}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

export default fetchTrivia;
