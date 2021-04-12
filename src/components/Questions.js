import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NextButton from './NextButton';
import { fetchQuestions, increaseScore, isAnswered } from '../actions/game';

import './Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswer: '',
      wrongAnswer: '',
      questionIndex: 0,
      redirect: false,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.getIndex = this.getIndex.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  getIndex() {
    const { questionIndex } = this.state;
    const lastIndex = 4;
    if (questionIndex < lastIndex) {
      this.setState({
        questionIndex: questionIndex + 1,
      });
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  checkAnswer({ target }) {
    const { addScore, questions, questionPos, dispatchAnswered } = this.props;
    const { value, key } = target;
    const { difficulty, correct_answer: correctAnswer } = questions[questionPos];
    const isCorrect = value === correctAnswer ? 1 : 0;
    const correctQuestions = 0;
    addScore(isCorrect, difficulty);
    this.setState({
      correctAnswer: 'correct',
      wrongAnswer: 'wrong',
    });
    dispatchAnswered();
    if (key === 0) {
      localStorage.setItem('state', JSON.stringify({
        player: { correctQuestions: correctQuestions + 1 },
      }));
    }
  }

  render() {
    const { questions, isLoading, timer, questionPos, answered } = this.props;
    const { correctAnswer, wrongAnswer, redirect } = this.state;
    if (isLoading) return <h1>Loading...</h1>;
    if (redirect) return <Redirect to="/feedback" />;
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
            name={ index === 0 ? 'correct-answer' : 'wrong-answer' }
            data-testid={ index === 0 ? 'correct-answer' : 'wrong-answer' }
            className={ index === 0 ? correctAnswer : wrongAnswer }
            onClick={ this.checkAnswer }
            disabled={ timer === 0 }
          >
            { answer }
          </button>
        ))}
        { (answered || timer === 0) && <NextButton getIndex={ this.getIndex } /> }
      </main>
    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  answered: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  addScore: PropTypes.func.isRequired,
  questionPos: PropTypes.number.isRequired,
  dispatchAnswered: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionPos: state.game.questionPos,
  questions: state.game.questions,
  timer: state.game.timer,
  isLoading: state.game.isLoading,
  answered: state.game.answered,
  score: state.game.score,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
  addScore: (score, diff) => dispatch(increaseScore(score, diff)),
  dispatchAnswered: (answered) => dispatch(isAnswered(answered)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
