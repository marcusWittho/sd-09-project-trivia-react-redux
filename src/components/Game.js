import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncAsks, saveScore } from '../actions';
import { updateScoreToLocalStorage } from '../services/localStorage';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: 0,
      answerSelected: false,
      statusTimer: false,
      timer: 30,
      idInterval: '',
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.styleAnswer = this.styleAnswer.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
  }

  componentDidMount() {
    const { getAsks, token } = this.props;
    getAsks(token);
    this.setCronometer();
  }

  setReduxAndLocalStorage(answer) {
    const { asks } = this.props;
    const { timer } = this.state;
    const ask = asks.find((askItem) => answer === askItem.correct_answer);
    const { difficulty } = ask;
    const valuePattern = 10;
    const valueHard = 3;
    let valueDifficulty = difficulty;

    if (valueDifficulty === 'hard') valueDifficulty = valueHard;
    else if (valueDifficulty === 'medium') valueDifficulty = 2;
    valueDifficulty = 1;
    const score = valuePattern + (timer * valueDifficulty);
    const getData = localStorage.getItem('state');
    const dataStorage = { ...JSON.parse(getData) };
    dataStorage.player.score += score;
    updateScoreToLocalStorage(dataStorage.player.gravatarEmail, dataStorage.player.score);
    this.updateScore(dataStorage);
  }

  setCronometer() {
    const time = 1000;
    const interval = setInterval(() => this.cronometer(), time);
    this.setState((state) => ({ ...state, idInterval: interval }));
  }

  updateScore(dataStorage) {
    const { savScore } = this.props;
    savScore(dataStorage.player.score);
    localStorage.setItem('state', JSON.stringify({ ...dataStorage }));
  }

  cronometer() {
    this.setState((state) => {
      let objState = {};
      if (state.timer > 0) {
        objState = ({ ...state, statusTimer: true, timer: state.timer - 1 });
      } else {
        clearInterval(state.idInterval);
        objState = ({ ...state, timer: 'Finished', answerSelected: true });
      }
      return objState;
    });
  }

  styleAnswer(answer, correctAnswer) {
    const { answerSelected } = this.state;
    if (answerSelected) {
      if (answer === correctAnswer) {
        return { border: '3px solid rgb(6, 240, 15)' };
      }
      if (answer !== correctAnswer) {
        return { border: '3px solid rgb(255, 0, 0)' };
      }
    }
    return { border: null };
  }

  answerSelected(evt) {
    const { value } = evt.target;
    this.setState((state) => {
      clearInterval(state.idInterval);
      return ({ ...state, answerSelected: true });
    });
    if (value) this.setReduxAndLocalStorage(value);
  }

  shuffleAnswers(array) {
    const HALF = 0.5;
    array.sort(() => HALF - Math.random());
  }

  nextQuestion() {
    const { answerIndex } = this.state;
    this.setState({
      answerIndex: answerIndex + 1,
      answerSelected: false,
      statusTimer: false,
      timer: 30,
    });
    this.setCronometer();
  }

  elementAnswer(answer, testid, index, correctAnswer) {
    const { timer } = this.state;
    return (
      <button
        value={ (correctAnswer === answer) ? answer : '' }
        disabled={ (timer === 'Finished') }
        key={ index }
        type="button"
        data-testid={ testid }
        style={ this.styleAnswer(answer, correctAnswer) }
        onClick={ this.answerSelected }
      >
        { answer }
      </button>
    );
  }

  elementButtonNext() {
    const { answerIndex } = this.state;
    const MAX = 4;
    if (answerIndex === MAX) {
      return (
        <Link to="/feedback">
          <button
            type="button"
            data-testid="btn-next"
          >
            Finalizar
          </button>
        </Link>
      );
    }
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Próxima
      </button>
    );
  }

  render() {
    const MAX_QUESTIONS = 4;
    const { answerIndex, answerSelected, timer, statusTimer } = this.state;
    const { asks } = this.props;
    if (!asks.length) return <p>Carregando...</p>;
    const { category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: wrongAnswers } = asks[answerIndex];
    const allAnswers = [correctAnswer, ...wrongAnswers];
    const array = [];
    allAnswers.map(
      (answer, index) => (answer === correctAnswer
        ? array.push(this.elementAnswer(answer, 'correct-answer', index, correctAnswer))
        : array.push(this
          .elementAnswer(answer, `wrong-answer-${index - 1}`, index, correctAnswer))),
    );
    return (
      <div className="ask-container">
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <p>
          { !answerSelected && !statusTimer && this.shuffleAnswers(array) }
          { array.map(((element, index) => (
            <div key={ index }>
              { element }
            </div>
          )))}
        </p>
        {(answerSelected && answerIndex <= MAX_QUESTIONS)
        && this.elementButtonNext()}
        <p>{`Timer: ${timer}`}</p>
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  asks: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAsks: PropTypes.func.isRequired,
  savScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  asks: state.askAndAnswersReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getAsks: (token) => dispatch(asyncAsks(token)),
  savScore: (score) => dispatch(saveScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
