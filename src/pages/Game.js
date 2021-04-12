import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './game.css';
import WaveTop from '../img/wave-top.svg';
import WaveBottom from '../img/wave-bottom.svg';
import QuestionMark from '../img/questao.png';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      triviaArray: [],
      error: false,
      position: 0,
    };

    this.renderAnswer = this.renderAnswer.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.changeButtonColor = this.changeButtonColor.bind(this);
  }

  componentDidMount() {
    const { triviaObject } = this.props;
    const errorCode = 3;

    if (triviaObject) {
      const { response_code: responseCode, results } = triviaObject;

      this.validateResponseFromApi(responseCode, errorCode, results);
    }
  }

  changeButtonColor() {
    const correctAnswer = document.getElementById('correct-awnser');
    const wrongAnswers = document.querySelectorAll('.wrong-answer');

    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';
    for (let i = 0; i < wrongAnswers.length; i += 1) {
      wrongAnswers[i].style.border = '3px solid rgb(255, 0, 0)';
    }
  }

  validateResponseFromApi(responseCode, errorCode, results) {
    if (responseCode === errorCode) {
      this.setState({
        error: true,
      });
    }

    this.setState({
      triviaArray: results,
      error: false,
    });
  }

  renderCorrectAnswer(correctAnswer) {
    return (
      <button
        type="button"
        key={ correctAnswer }
        data-testid="correct-answer"
        id="correct-awnser"
        onClick={ this.changeButtonColor }
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
        onClick={ this.changeButtonColor }
      >
        { answer }
      </button>
    ));
  }

  renderAnswer(incorrectAnswers, correctAnswer) {
    const incorrectButtons = this.renderIncorrectAnswers(incorrectAnswers);
    const correctButton = this.renderCorrectAnswer(correctAnswer);
    const answerArray = [...incorrectButtons, correctButton];
    const randomModifier = 0.5;

    return answerArray.sort(() => Math.random() - randomModifier);
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
          {triviaArray[position].category}
        </span>
        <span className="question" data-testid="question-text">
          {triviaArray[position].question}
        </span>
        <div className="answerButton">
          {this.renderAnswer(incorrectAnswers, correctAnswer)}
        </div>
      </div>
    );
  }

  render() {
    const { error, triviaArray } = this.state;
    if (!triviaArray) return <Redirect to="/" />;
    return (
      <section className="game-section">
        <Header />
        <img className="question-Mark-left" src={ QuestionMark } alt="wave" />
        <section className="card-container">
          <img className="wave-top" src={ WaveTop } alt="wave" />
          <div className="game-card">
            { error || triviaArray.length === 0
              ? <span>Carregando... </span>
              : this.renderQuestion() }
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
});

export default connect(mapStateToProps)(Game);
