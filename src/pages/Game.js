import React, { Component } from 'react';
import requestTrivia from '../services/triviaAPI';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      triviaArray: [],
      error: false,
    };

    this.generateRandomNumber = this.generateRandomNumber.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const triviaResponse = await requestTrivia(token);

    const { response_code, results } = triviaResponse;

    if (response_code === 3) {
      this.setState({
        error: true,
      });
    }

    this.setState({
      triviaArray: results,
      error: false,
    });
  }

  generateRandomNumber(number) {
    const randomNumber = Math.floor(Math.random() * number);

    return randomNumber;
  }

  renderCorrectAnswer(correctAnswer) {
    return (
      <button key={correctAnswer} data-testid="correct-answer">
        {correctAnswer}
      </button>
    );
  }

  renderIncorrectAnswers(incorrectAnswers) {
    return incorrectAnswers.map((answer, index) => (
      <button key={answer} data-testid={`wrong-answer-${index}`}>
        {answer}
      </button>
    ));
  }

  renderAnswer(incorrect_answers, correct_answer) {
    const incorrectButtons = this.renderIncorrectAnswers(incorrect_answers);
    const correctButton = this.renderCorrectAnswer(correct_answer);
    const answerArray = [...incorrectButtons, correctButton];

    return answerArray.sort(() => Math.random() - 0.5);
  }

  renderQuestion() {
    const { triviaArray } = this.state;
    const position = this.generateRandomNumber(triviaArray.length - 1);
    if (triviaArray.length > 0) {
      const { incorrect_answers, correct_answer } = triviaArray[position];
      return (
        <div>
          <p data-testid="question-category">
            Category: {triviaArray[position].category}
          </p>
          <p data-testid="question-text">
            Question: {triviaArray[position].question}
          </p>
          {this.renderAnswer(incorrect_answers, correct_answer)}
        </div>
      );
    }
  }

  render() {
    const { error } = this.state;
    return (
      <main>{error ? <p>Erro no carregamento</p> : this.renderQuestion()}</main>
    );
  }
}

export default Game;
