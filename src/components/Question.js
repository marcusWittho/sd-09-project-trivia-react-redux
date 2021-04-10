import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scoreThisCorrectAnswer from '../actions/score';

// BELOW THERE IS A DEV CONST UNTIL DOING TIMER FUNCTION

const THISANSWEREDTIMER = 15;

class Question extends Component {
  constructor() {
    super();
    this.state = {
      isAnswered: false,
      answersOrder: [],
    };
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  componentDidMount() {
    this.setRandomAnswersOrder();
  }

  setRandomAnswersOrder() {
    const CONST_RANDOM = 0.5;
    const { question: { incorrect_answers: incorrectAnswers } } = this.props;
    const answersLength = incorrectAnswers.length + 1;
    const randomOrderArray = Array.from(
      { length: answersLength },
      (_, index) => index,
    ).sort(() => Math.random() - CONST_RANDOM);
    this.setState({ answersOrder: randomOrderArray });
  }

  answerQuestion({ target }) {
    const { question: {
      correct_answer: correctAnswer,
      difficulty,
    }, scoreCorrect } = this.props;
    const isCorrectAnswer = target.textContent === correctAnswer;
    if (isCorrectAnswer) scoreCorrect({ difficulty, THISANSWEREDTIMER });
    this.setState({ isAnswered: true });
  }

  renderAnswers() {
    const { isAnswered, answersOrder } = this.state;
    const { question: {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.props;
    const correctAnswersButtons = (
      <button
        key="correct"
        type="button"
        data-testid="correct-answer"
        { ...isAnswered && { style: { border: '3px solid rgb(6, 240, 15)' } } }
        onClick={ isAnswered
          ? () => null
          : this.answerQuestion }
      >
        { correctAnswer }
      </button>
    );
    const incorrectAnswersButtons = incorrectAnswers.map(
      (incorrectAnswer, index) => (
        <button
          type="button"
          key={ index + 1 }
          data-testid={ `wrong-answer-${index}` }
          { ...isAnswered && { style: { border: '3px solid rgb(255, 0, 0)' } } }
          onClick={ isAnswered
            ? () => null
            : this.answerQuestion }
        >
          { incorrectAnswer }
        </button>
      ),
    );
    const answers = [correctAnswersButtons, ...incorrectAnswersButtons];
    return answersOrder.map((displayIndex) => answers[displayIndex]);
  }

  render() {
    const { question: {
      category,
      question,
    } } = this.props;

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        { this.renderAnswers() }
      </div>
    );
  }
}

const mapDispatchToProps = ({
  scoreCorrect: scoreThisCorrectAnswer,
});

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  scoreCorrect: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Question);
