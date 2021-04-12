import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './game.css';
import WaveTop from '../img/wave-top.svg';
import WaveBottom from '../img/wave-bottom.svg';
import Question from '../img/questao.png';

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
  }

  componentDidMount() {
    const { triviaObject } = this.props;
    const errorCode = 3;

    if (triviaObject) {
      const { response_code: responseCode, results } = triviaObject;

      this.validateResponseFromApi(responseCode, errorCode, results);
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
      <div className="answerButton" key={ correctAnswer }>
        <button
          type="button"
          data-testid="correct-answer"
        >
          { correctAnswer }
        </button>
      </div>
    );
  }

  renderIncorrectAnswers(incorrectAnswers) {
    return incorrectAnswers.map((answer, index) => (
      <div className="answerButton" key={ answer }>
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
        >
          { answer }
        </button>
      </div>
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
        {this.renderAnswer(incorrectAnswers, correctAnswer)}
      </div>
    );
  }

  render() {
    const { error, triviaArray } = this.state;
    if (!triviaArray) return <Redirect to="/" />;

    return (
      <section className="game-section">
        <Header />
        <img className="question-left" src={ Question } alt="wave" />
        <section className="card-container">
          <img className="wave-top" src={ WaveTop } alt="wave" />
          <div className="game-card">
            { error || triviaArray.length === 0
              ? <span>Carregando... </span>
              : this.renderQuestion() }
          </div>
          <img className="wave-bottom" src={ WaveBottom } alt="wave" />
        </section>
        <img className="question-right" src={ Question } alt="wave" />
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
