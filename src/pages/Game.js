import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { scoreAction } from '../actions/playerAction';
import './game.css';
import WaveTop from '../img/wave-top.svg';
import WaveBottom from '../img/wave-bottom.svg';
import QuestionMark from '../img/questao.png';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      triviaArray: [],
      shuffledArray: [],
      buttonStatus: false,
      responseCode: 3,
      redirect: false,
      position: 0,
      currentTime: 30,
    };

    this.renderAnswer = this.renderAnswer.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.timerUpdate = this.timerUpdate.bind(this);
    this.timerTimeout = this.timerTimeout.bind(this);
    this.nextQuention = this.nextQuention.bind(this);
  }

  componentDidMount() {
    const { triviaObject } = this.props;
    if (triviaObject) {
      this.saveTriviaOnState(triviaObject);
      this.saveStateOnStorage();
    }
    this.timerUpdate();
  }

  componentDidUpdate() { this.saveStateOnStorage(); }

  saveTriviaOnState(triviaObject) {
    const { response_code: responseCode, results } = triviaObject;
    this.setState({
      triviaArray: results,
      responseCode,
    });
  }

  timerUpdate() {
    const intervalTime = 1000;
    const timer = setInterval(() => {
      const { currentTime } = this.state;
      if (currentTime > 0) this.setState({ currentTime: currentTime - 1 });
      else {
        clearInterval(timer);
        this.timerTimeout();
      }
    }, intervalTime);
  }

  changeButtonColor() {
    const correctAnswerButton = document.getElementById('correct-awnser');
    const wrongAnswersButtons = document.querySelectorAll('.wrong-answer');
    if (correctAnswerButton && wrongAnswersButtons) {
      correctAnswerButton.style.border = '3px solid rgb(6, 240, 15)';
      correctAnswerButton.disabled = true;
      wrongAnswersButtons.forEach((button) => {
        button.style.border = '3px solid rgb(255, 0, 0)';
        button.disabled = true;
      });
    }
  }

  timerTimeout() {
    const { currentTime } = this.state;
    this.setState({ buttonStatus: true });
    this.changeButtonColor();
    if (currentTime !== 0) { this.setState({ currentTime: 0 }); }
  }

  addScore() {
    const { triviaArray, position, currentTime } = this.state;
    const { scoreDispatch } = this.props;
    const { difficulty } = triviaArray[position];
    const baseScore = 10;
    const maxScore = 3;
    let difficultyValue;
    if (difficulty === 'easy') difficultyValue = 1;
    else if (difficulty === 'medium') difficultyValue = 2;
    else difficultyValue = maxScore;
    const score = baseScore + (currentTime * difficultyValue);
    scoreDispatch(score);
  }

  saveStateOnStorage() {
    const { state } = this.props;
    localStorage.setItem('state', JSON.stringify(state));
  }

  nextQuention() {
    const correctAnswerButton = document.getElementById('correct-awnser');
    const wrongAnswersButtons = document.querySelectorAll('.wrong-answer');
    const { position } = this.state;
    const maxPosition = 4;
    if (position !== maxPosition) {
      this.setState({
        shuffledArray: [],
        position: position + 1,
        currentTime: 30,
        buttonStatus: false,
      });
      correctAnswerButton.disabled = false;
      wrongAnswersButtons.forEach((button) => {
        button.disabled = false;
      });
      this.timerUpdate();
    } else this.setState({ redirect: true });
  }

  renderCorrectAnswer(correctAnswer) {
    return (
      <button
        type="button"
        key={ correctAnswer }
        data-testid="correct-answer"
        id="correct-awnser"
        onClick={ () => {
          this.changeButtonColor();
          this.timerTimeout();
          this.addScore();
        } }
      >
        { correctAnswer }
      </button>
    );
  }

  renderIncorrectAnswers(incorrectAnswers) {
    return incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        key={ answer }
        data-testid={ `wrong-answer-${index}` }
        className="wrong-answer"
        onClick={ () => {
          this.changeButtonColor();
          this.timerTimeout();
        } }
      >
        {answer}
      </button>
    ));
  }

  renderAnswer(incorrectAnswers, correctAnswer) {
    const incorrectButtons = this.renderIncorrectAnswers(incorrectAnswers);
    const correctButton = this.renderCorrectAnswer(correctAnswer);
    const answerArray = [...incorrectButtons, correctButton];
    const { shuffledArray } = this.state;
    const randomModifier = 0.5;
    if (shuffledArray.length === 0) {
      answerArray.sort(() => Math.random() - randomModifier);
      this.setState({ shuffledArray: answerArray });
      return answerArray;
    }
    return shuffledArray;
  }

  renderQuestion() {
    const { triviaArray, position } = this.state;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = triviaArray[position];
    return (
      <div>
        <span className="question-category" data-testid="question-category">
          { triviaArray[position].category }
        </span>
        <span className="question" data-testid="question-text">
          { triviaArray[position].question }
        </span>
        <div className="answerButton">
          { this.renderAnswer(incorrectAnswers, correctAnswer) }
        </div>
      </div>
    );
  }

  render() {
    const { triviaArray, currentTime, responseCode, buttonStatus, redirect } = this.state;
    if (!triviaArray) return <Redirect to="/" />;
    if (redirect) return <Redirect to="/feedback" />;
    const errorCode = 3;
    return (
      <section className="game-section">
        <Header />
        <img className="question-Mark-left" src={ QuestionMark } alt="wave" />
        <section className="card-container">
          <img className="wave-top" src={ WaveTop } alt="wave" />
          <div className="game-card">
            { responseCode === errorCode || triviaArray.length === 0 ? (
              <span>Carregando... </span>
            ) : (
              <div>
                {this.renderQuestion()}
                <span>
                  Time:
                  {currentTime}
                </span>
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.nextQuention }
                  hidden={ !buttonStatus }
                >
                  Next
                </button>
              </div>
            ) }
          </div>
          <img className="wave-bottom" src={ WaveBottom } alt="wave" />
        </section>
        <img className="question-Mark-right" src={ QuestionMark } alt="wave" />
      </section>
    );
  }
}

Game.propTypes = {
  triviaObject: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(Object),
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  triviaObject: state.trivia.triviaObject,
  state,
});

const mapDispatchToProps = (dispatch) => ({
  scoreDispatch: (score) => dispatch(scoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
