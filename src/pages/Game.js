import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  setupRandomAnswers(correctAnswer, incorrectAnswers) {
    const CONST_RANDOM = 0.5;
    const correctAnswersButtons = (
      <button key="correct" type="button" data-testid="correct-answer">
        {correctAnswer}
      </button>
    );
    const incorrectAnswersButtons = incorrectAnswers.map(
      (incorrectAnswer, index) => (
        <button
          type="button"
          key={ index + 1 }
          data-testid={ `wrong-answer-${index}` }
        >
          {incorrectAnswer}
        </button>
      ),
    );
    const answers = [correctAnswersButtons, ...incorrectAnswersButtons];
    return [...answers.sort(() => Math.random() - CONST_RANDOM)];
  }

  renderQuestions() {
    const { questions } = this.props;
    return questions.map(
      (
        {
          category,
          question,
          correct_answer: correctAnswer,
          incorrect_answers: incorrectAnswers,
        },
        questionNumber,
      ) => (
        <div key={ questionNumber }>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{question}</p>
          {this.setupRandomAnswers(correctAnswer, incorrectAnswers)}
        </div>
      ),
    );
  }

  render() {
    return (
      <>
        <Header />
        { this.renderQuestions() }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
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
};
