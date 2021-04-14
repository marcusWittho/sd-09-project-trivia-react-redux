export const getToken = async () => {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};

export const getAnswer = async (number, token) => {
  const endPoint = `https://opentdb.com/api.php?amount=${number}&token=${token}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  result.results.forEach((question) => {
    const { correct_answer: correct, incorrect_answers: incorrect } = question;
    const RANDOM = 0.5;
    const sortedOptions = [...incorrect, correct].sort(() => RANDOM - Math.random());
    question.sortedOptions = sortedOptions;
  });
  return result;
};

export const apiMock = (() => {
  const response = {
    response_code: '0',
    results: [
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the first weapon you acquire in Half-Life?',
        correct_answer: 'A crowbar',
        incorrect_answers: [
          'A pistol',
          'The H.E.V suit',
          'Your fists',
        ],
      },
      {
        category: 'Entertainment:  Video Games',
        type: 'boolean',
        difficulty: 'hard',
        question: `{TF2: Sentry rocket damage falloff is calculated based on the} +
        {distance between the sentry and the enemy, not the engineer and the enemy')}`,
        correct_answer: 'False',
        incorrect_answers: ['True'],
      },
    ],
  };
  return response;
});