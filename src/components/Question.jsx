import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.getRandomIntInclusive = this.getRandomIntInclusive.bind(this);
    this.renderAlternatives = this.renderAlternatives.bind(this);
  }

  // by https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  renderAlternatives() {
    const { questionData } = this.props;
    const { results } = questionData;
    const correctAnswer = (
      <button type="button" data-testid="correct-answer">
        { results[0].correct_answer }
      </button>
    );
    const answers = results[0].incorrect_answers.map((answer, index) => (
      <button
        key={ answer }
        type="button"
        data-testid={ `wrong-answer-${index}` }
      >
        { answer }
      </button>));
    if (results[0].type === 'boolean') {
      answers.push(correctAnswer);
      return (
        <div className="question-alternatives">
          { answers.map((answer) => answer) }
        </div>
      );
    }
    const answerLimit = 3;
    const correctAnswerPosition = this.getRandomIntInclusive(0, answerLimit);
    const answerToReplace = answers[correctAnswerPosition];
    answers.splice(correctAnswerPosition, 1, correctAnswer);
    answers.push(answerToReplace);
    return (
      <div className="question-alternatives">
        { answers.map((answer) => answer) }
      </div>
    );
  }

  render() {
    const { questionData } = this.props;
    const { results } = questionData;
    console.log(questionData);
    return (
      <div className="main-question">
        <div className="question-description">
          <span data-testid="question-category">
            { results[0].category }
          </span>
          <span data-testid="question-text">
            { results[0].question }
          </span>
        </div>
        { this.renderAlternatives() }
      </div>
    );
  }
}
Question.propTypes = {
  questionData: PropTypes.shape().isRequired,
};
export default Question;
