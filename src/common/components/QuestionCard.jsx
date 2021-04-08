import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';
import { runTimer, updateScore } from '../../actions/action';

import './QuestionCard.css';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.isCorrect = this.isCorrect.bind(this);
  }

  isCorrect({ target }) {
    const { showStyle, changeScore } = this.props;
    const { name } = target;
    if (name === 'correct') {
      changeScore(1);
    }
    console.log(name);
    return showStyle();
  }

  renderCurrentQuestion() {
    const { renderQuestion, updateQuestion, applyStyle, disableOptions } = this.props;
    return (
      <div>
        <h3 data-testid="question-category">
          { renderQuestion.category }
        </h3>
        <p data-testid="question-text">
          { renderQuestion.question }
        </p>
        { renderQuestion.incorrect_answers.map((option, index) => (
          <button
            className={ applyStyle ? 'wrongAnswerStyle' : null }
            key={ index }
            name="incorrect"
            data-testid={ `wrong-answer-${index}` }
            type="button"
            onClick={ (event) => this.isCorrect(event) }
          >
            { option }
          </button>
        )) }
        <button
          className={ applyStyle ? 'correctAnswerStyle' : null }
          name="correct"
          type="button"
          isCorrect="true"
          data-testid="correct-answer"
          onClick={ (event) => this.isCorrect(event) }
        >
          { renderQuestion.correct_answer }
        </button>
        <button
          type="button"
          id="next-btn"
          data-testid="btn-next"
          disabled={ !applyStyle }
          onClick={ () => updateQuestion() }
        >
          Próxima
        </button>
        <Timer updateQuestion={ updateQuestion } disableOptions={ disableOptions } />
      </div>
    );
  }

  render() {
    // const { timer, sendTimer } = this.props;
    // const initialTimer = 30;
    // return timer === initialTimer
    //   ? this.renderCurrentQuestion()
    // : () => sendTimer(initialTimer);
    return this.renderCurrentQuestion();
  }
}

QuestionCard.propTypes = {
  renderQuestion: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  showStyle: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  applyStyle: PropTypes.func.isRequired,
  changeScore: PropTypes.func.isRequired,
  disableOptions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.timer,
});

const mapDispatchToProps = (dispatch) => ({
  sendTimer: (time) => dispatch(runTimer(time)),
  changeScore: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
