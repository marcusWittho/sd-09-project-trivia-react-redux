const multipleChoisesObject = (query) => {
  const {
    question,
    category,
    difficulty,
    type,
    correct_answer: correct,
    incorrect_answers: incorrects,
  } = query;

  return (
    {
      question,
      category,
      difficulty,
      type,
      options: [
        {
          id: 'correct-answer',
          option: correct,
        },
        {
          id: 'wrong-answer 0',
          option: incorrects[0],
        },
        {
          id: 'wrong-answer 1',
          option: incorrects[1],
        },
        {
          id: 'wrong-answer 2',
          option: incorrects[2],
        },
      ],
    }
  );
};

const trueOrFalseObject = (query) => {
  const {
    question,
    category,
    difficulty,
    type,
    correct_answer: correct,
    incorrect_answers: incorrects,
  } = query;

  return (
    {
      question,
      category,
      difficulty,
      type,
      options: [
        {
          id: 'correct-answer',
          option: correct,
        },
        {
          id: 'wrong-answer 0',
          option: incorrects[0],
        },
      ],
    }
  );
};

const shuffleOptions = (array) => {
  let shuffleArray = [];

  array.forEach((query) => {
    const keyToMathRandom = 0.5;
    if (query.type === 'multiple') {
      const formatMultiple = multipleChoisesObject(query);
      const { options } = formatMultiple;

      options.sort(() => keyToMathRandom - Math.random());

      shuffleArray = [...shuffleArray, formatMultiple];
    } else {
      const formatTrueOrFalse = trueOrFalseObject(query);
      const { options } = formatTrueOrFalse;

      options.sort(() => keyToMathRandom - Math.random());

      shuffleArray = [...shuffleArray, formatTrueOrFalse];
    }
  });
  return shuffleArray;
};

export default shuffleOptions;
