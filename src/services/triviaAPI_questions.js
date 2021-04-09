const filterQuestions = (questions) => {
  const filtered = [];
  Object.keys(questions).forEach((question) => {
    if (question === 'results') {
      filtered.push(questions[question]);
    }
  });
  return filtered[0];
};

const getQuestions = async (token) => {
  const GET_QUESTIONS_ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;

  try {
    const response = await fetch(GET_QUESTIONS_ENDPOINT);
    if (response.ok) {
      const questions = await response.json();
      if (questions.response_code === 0) {
        const filteredQuestions = filterQuestions(questions);
        return filteredQuestions;
      }
    }
    throw new Error('Falha na busca pelas questoes.');
  } catch (error) {
    return error;
  }
};

export default getQuestions;
