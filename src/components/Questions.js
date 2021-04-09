import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/game';

import './Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      correctAnswer: '',
      wrongAnswer: '',
      buttonDisabled: false,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
    const disabledTimer = 30000;
    this.timerToDisableButtons = setInterval(
      () => this.disableButtons(),
      disabledTimer,
    );
  }

  checkAnswer() {
    this.setState({
      correctAnswer: 'correct',
      wrongAnswer: 'wrong',
    });
  }

  disableButtons() {
    this.setState({
      buttonDisabled: true,
    });
  }

  categories(questions, questionIndex) {
    return (
      <p
        data-testid="question-category"
      >
        Categoria:
        { questions[questionIndex].category }
      </p>
    );
  }

  render() {
    const { questions, isLoading } = this.props;
    const { questionIndex, correctAnswer, wrongAnswer, buttonDisabled } = this.state;
    if (isLoading) return <h1>Loading...</h1>;
    return (
      <main>
        { this.categories(questions, questionIndex) }
        <p data-testid="question-text">{ questions[0].question }</p>
        <button
          type="button"
          data-testid="correct-answer"
          className={ correctAnswer }
          onClick={ this.checkAnswer }
          disabled={ buttonDisabled }
        >
          { questions[questionIndex].correct_answer }
        </button>
        <button
          type="button"
          data-testid="wrong-answer-0"
          className={ wrongAnswer }
          onClick={ this.checkAnswer }
          disabled={ buttonDisabled }
        >
          { questions[questionIndex].incorrect_answers[0] }
        </button>
        <button
          type="button"
          data-testid="wrong-answer-1"
          className={ wrongAnswer }
          onClick={ this.checkAnswer }
          disabled={ buttonDisabled }
        >
          { questions[questionIndex].incorrect_answers[1] }
        </button>
        <button
          type="button"
          data-testid="wrong-answer-2"
          className={ wrongAnswer }
          onClick={ this.checkAnswer }
          disabled={ buttonDisabled }
        >
          { questions[questionIndex].incorrect_answers[2] }
        </button>
      </main>
    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  isLoading: state.game.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
