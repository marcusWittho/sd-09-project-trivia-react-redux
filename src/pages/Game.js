import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

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
    console.log(triviaObject);
    const errorCode = 3;
    const { response_code: responseCode, results } = triviaObject;

    this.validateResponseFromApi(responseCode, errorCode, results);
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
      <button type="button" key={ correctAnswer } data-testid="correct-answer">
        { correctAnswer }
      </button>
    );
  }

  renderIncorrectAnswers(incorrectAnswers) {
    return incorrectAnswers.map((answer, index) => (
      <button type="button" key={ answer } data-testid={ `wrong-answer-${index}` }>
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
        <span data-testid="question-category">
          {triviaArray[position].category}
        </span>
        <span data-testid="question-text">
          {triviaArray[position].question}
        </span>
        {this.renderAnswer(incorrectAnswers, correctAnswer)}
      </div>
    );
  }

  render() {
    const { error, triviaArray } = this.state;

    return (
      <div>
        <Header />
        { error || triviaArray.length === 0
          ? <span>Carregando... </span>
          : this.renderQuestion() }
      </div>
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
