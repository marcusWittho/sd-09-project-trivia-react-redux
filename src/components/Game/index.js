import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveScore } from '../../actions';
import { addPlayerInRanking } from '../../services/localStorage';
import './styles.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusRandom: true,
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
    this.setCronometer();
  }

  setRanking() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    addPlayerInRanking(player.gravatarEmail, player);
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
    const dataStorage = { ...JSON.parse(localStorage.getItem('state')) };
    dataStorage.player.score += score;
    this.updateScore(dataStorage);
  }

  setCronometer() {
    const time = 1000;
    const interval = setInterval(() => this.cronometer(), time);
    this.setState((state) => ({ ...state, idInterval: interval }));
  }

  updateScore(dataStorage) {
    const { savScore } = this.props;
    dataStorage.player.assertions += 1;
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
    const { timer, answerSelected } = this.state;
    return (
      <button
        className="btn-answer"
        value={ (correctAnswer === answer) ? answer : '' }
        disabled={ (timer === 'Finished' || answerSelected) }
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
            className="btn-finish"
            onClick={ this.setRanking }
            type="button"
            data-testid="btn-next"
          >
            Finalizar
            <i className="fas fa-check" />
          </button>
        </Link>
      );
    }
    return (
      <button
        className="btn-next"
        type="button"
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Próxima
        <i className="fas fa-arrow-right" />
      </button>
    );
  }

  prepareAnswers(answerIndex) {
    const { asks } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: wrongAnswers,
    } = asks[answerIndex];
    const allAnswers = [correctAnswer, ...wrongAnswers];
    const array = [];

    allAnswers.forEach(
      (answer, index) => (answer === correctAnswer
        ? array.push(this.elementAnswer(answer, 'correct-answer', index, correctAnswer))
        : array.push(this
          .elementAnswer(answer, `wrong-answer-${index - 1}`, index, correctAnswer))),
    );
    return array;
  }

  render() {
    const MAX_QUESTIONS = 4;
    const { answerIndex, answerSelected, timer } = this.state;
    const { asks } = this.props;
    const { category, question } = asks[answerIndex];
    if (asks[answerIndex].category !== '') {
      return (
        <div className="container-page-asks">
          <div className="container-title-ask">
            <p className="text-category" data-testid="question-category">{ category }</p>
            <p className="text-question" data-testid="question-text">{ question }</p>
          </div>
          <div className="container-asks">
            { this.prepareAnswers(answerIndex).map(((element, index) => (
              <div className="option-ask" key={ index }>
                { element }
              </div>
            )))}
            <div className="container-btn">
              {(answerSelected && answerIndex <= MAX_QUESTIONS)
              && this.elementButtonNext()}
            </div>
          </div>
          <div className="container-clock">
            <i className="far fa-clock" />
            <p className="text-timer">{ timer }</p>
          </div>
        </div>
      );
    }
    return <p>Carregando... PREPARE-SE!</p>;
  }
}

Game.propTypes = {
  asks: PropTypes.arrayOf(PropTypes.object).isRequired,
  savScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  asks: state.askAndAnswersReducer,
});

const mapDispatchToProps = (dispatch) => ({
  savScore: (score) => dispatch(saveScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
