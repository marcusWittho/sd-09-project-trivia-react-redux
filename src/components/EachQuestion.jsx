import React, { Component } from 'react';
import PropTypes from 'prop-types';

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
// * Source https://stackoverflow.com/questions/38101522/how-to-render-random-objects-from-an-array-in-react /

class EachQuestion extends Component {
  render() {
    const { questions, questionIndex, questionAnswered, answerQuestion, timer } = this.props;
    const shuffledAlternatives = shuffleArray(questions[questionIndex].incorrect_answers);
    return (
      <main>
        <p
          data-testid="question-category"
        >
          Categoria:
          { questions[questionIndex].category }
        </p>
        <p data-testid="question-text">
          { questions[questionIndex].question }
        </p>
        <button
          data-testid="correct-answer"
          type="button"
          style={ (questionAnswered) ? { border: '3px solid rgb(6, 240, 15)' } : {} }
          onClick={ answerQuestion }
          value="correct-answer"
          disabled={ timer === 0 }
        >
          {questions[questionIndex].correct_answer}
        </button>
        {shuffledAlternatives.map((alternative, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            type="button"
            key={ `${index}` }
            style={ (questionAnswered) ? { border: '3px solid rgb(255, 0, 0)' } : {} }
            onClick={ answerQuestion }
            value="wrong-answer"
            disabled={ timer === 0 }
          >
            {alternative}
          </button>
        ))}
      </main>
    );
  }
}

EachQuestion.propTypes = {
  sendQuestionsToRedux: PropTypes.func,
}.isRequired;

export default EachQuestion;
