import React from 'react';

const multipleChoisesObject = (correct, incorrects) => ([
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
]);

const trueOrFalseObject = (correct, incorrects) => ([
  {
    id: 'correct-answer',
    option: correct,
  },
  {
    id: 'wrong-answer 0',
    option: incorrects,
  },
]);

const options = (correct, incorrects) => {
  const multipleChoise = multipleChoisesObject(correct, incorrects);
  const trueOrFalse = trueOrFalseObject(correct, incorrects);
  const keyToMathRandom = 0.5;
  let allChoises = [];

  if (incorrects.length === 2) {
    allChoises = trueOrFalse.sort(() => keyToMathRandom - Math.random());
  } else {
    allChoises = multipleChoise.sort(() => keyToMathRandom - Math.random());
  }

  return (
    <div>
      {
        allChoises.map(({ id, option }) => (
          <button
            key={ id }
            type="button"
            data-testid={ id }
          >
            { option }
          </button>
        ))
      }
    </div>

  );
};

export default options;
