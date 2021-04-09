import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      isAnswered: false,
      questionIndex: 0,
    };

    this.answerQuestion = this.answerQuestion.bind(this);
  }

  setupRandomAnswers(correctAnswer, incorrectAnswers) {
    const { isAnswered } = this.state;
    const CONST_RANDOM = 0.5;
    const correctAnswersButtons = (
      <button
        key="correct"
        type="button"
        data-testid="correct-answer"
        { ...isAnswered && { style: { border: '3px solid rgb(6, 240, 15)' } } }
        onClick={ isAnswered
          ? () => console.log('Respondido')
          : this.answerQuestion }
      >
        {correctAnswer}
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
            ? () => console.log('Respondido')
            : this.answerQuestion }
        >
          { incorrectAnswer }
        </button>
      ),
    );
    const answers = [correctAnswersButtons, ...incorrectAnswersButtons];
    return [...answers.sort(() => Math.random() - CONST_RANDOM)];
  }

  answerQuestion() {
    this.setState({ isAnswered: true });
  }

  renderQuestion() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];

    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        { this.setupRandomAnswers(correctAnswer, incorrectAnswers) }
      </div>
    );
  }

  render() {
    const { isFetching } = this.props;
    return (
      <>
        <Header />
        { !isFetching && this.renderQuestion() }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  isFetching: state.trivia.isFetching,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      type: PropTypes.string,
      difficulty: PropTypes.string,
      question: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
};
