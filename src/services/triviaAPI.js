const requestTrivia = async (token) => {
  const amount = 5;

  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&token=${token}`,
  );
  const triviaObject = await response.json();

  return triviaObject;
};

export default requestTrivia;
