const TOKEN_END_POINT_BASE = 'https://opentdb.com/api';

export const fetchApiToken = () => (
  fetch(`${TOKEN_END_POINT_BASE}_token.php?command=request`)
    .then((reponse) => reponse.json())
    .catch((error) => console.log(error))
);

export const fetchApiQuestions = (token) => (
  fetch(`${TOKEN_END_POINT_BASE}.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .catch((error) => console.log(error))
);
