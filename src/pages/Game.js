import React, { Component } from 'react';
import requestTrivia from '../services/triviaAPI';
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

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const triviaResponse = await requestTrivia(token);
    const errorCode = 3;
    const { response_code: responseCode, results } = triviaResponse;

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
    if (triviaArray.length > 0) {
      const {
        incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer,
      } = triviaArray[position];
      return (
        <div>
          <span data-testid="question-category">
            Category:
            {triviaArray[position].category}
          </span>
          <span data-testid="question-text">
            Question:
            {triviaArray[position].question}
          </span>
          {this.renderAnswer(incorrectAnswers, correctAnswer)}
        </div>
      );
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <Header />
        <main>{error ? <p>Erro no carregamento</p> : this.renderQuestion()}</main>
      </div>
    );
  }
}

export default Game;
