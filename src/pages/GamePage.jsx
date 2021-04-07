import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questionNumber: 0 };

    this.createAnswers = this.createAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  changeAnswerColor() {
    const answers = document.querySelectorAll('#answer');
    answers.forEach((answer) => {
      answer.style.border = '3px solid rgb(255, 0, 0)';
      if (answer.attributes[2].value === 'correct-answer') {
        answer.style.border = '3px solid rgb(6, 240, 15)';
      }
    });
  }

  handleClick() {
    this.changeAnswerColor();
  }

  createAnswers() {
    const { questionNumber } = this.state;
    const { questions } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionNumber];

    const arrayOfElements = incorrectAnswers.map((answer, index) => (
      <button
        id="answer"
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
        id="answer"
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
    const { questionNumber } = this.state;
    const { questions, isFetching } = this.props;
    if (isFetching) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <Header />
        <h2 data-testid="question-category">
          Category:
          {questions[questionNumber].category}
        </h2>
        <h3 data-testid="question-text">
          Question:
          {questions[questionNumber].question}
        </h3>
        <p>
          answer:
          {this.createAnswers()}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  isFetching: state.gameReducer.isFetching,
});

GamePage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(GamePage);
