import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.createQuestion = this.createQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
  }

  createQuestion(correctAnswer, incorrectAnswer) {
    const arrayOfElements = incorrectAnswer.map((answer, index) => (
      <button
        type="button"
        key={ answer }
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.handleClick }
      >
        {answer}
      </button>
    ));
    arrayOfElements.push(
      <button
        type="button"
        key={ correctAnswer }
        data-testid="correct-answer"
        onClick={ this.handleClick }
      >
        {correctAnswer}
      </button>,
    );
    arrayOfElements.sort();
    return arrayOfElements;
  }

  render() {
    const { questionObj } = this.props;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionObj;
    const arrayOfAswers = this.createQuestion(correctAnswer, incorrectAnswers);
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h3 data-testid="question-text">{question}</h3>
        {arrayOfAswers}
      </div>
    );
  }
}

Question.propTypes = {
  questionObj: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default Question;
