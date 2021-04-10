import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NextButton from './NextButton';
import { fetchQuestions, increaseScore } from '../actions/game';

import './Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      correctAnswer: '',
      wrongAnswer: '',
    };
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  checkAnswer({ target }) {
    const { addScore, questions, questionPos } = this.props;
    const { value } = target;
    const { difficulty, correct_answer: correctAnswer } = questions[questionPos];
    const isCorrect = value === correctAnswer ? 1 : 0;
    addScore(isCorrect, difficulty);
    this.setState({
      correctAnswer: 'correct',
      wrongAnswer: 'wrong',
      answered: true,
    });
  }

  render() {
    const { questions, isLoading, timer, questionPos } = this.props;
    const { correctAnswer, wrongAnswer, answered } = this.state;
    if (isLoading) return <h1>Loading...</h1>;
    const allAnswer = [
      questions[questionPos].correct_answer,
      ...questions[questionPos].incorrect_answers];
    return (
      <main>
        <p data-testid="question-category">
          {' '}
          Categoria:
          { questions[questionPos].category }
        </p>
        <p data-testid="question-text">{ questions[questionPos].question }</p>
        {allAnswer.map((answer, index) => (
          <button
            key={ index }
            type="button"
            value={ answer }
            data-testid={ index === 0 ? 'correct-answer' : 'wrong-answer' }
            className={ index === 0 ? correctAnswer : wrongAnswer }
            onClick={ this.checkAnswer }
            disabled={ timer === 0 }
          >
            { answer }
          </button>
        ))}
        { (answered || timer === 0) && <NextButton /> }
      </main>
    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  addScore: PropTypes.func.isRequired,
  questionPos: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questionPos: state.game.questionPos,
  questions: state.game.questions,
  timer: state.game.timer,
  isLoading: state.game.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
  addScore: (score, diff) => dispatch(increaseScore(score, diff)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
