import React, { Component } from 'react';
import { shape, string, arrayOf } from 'prop-types';
import Answer from './Answer';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  shuffleAnswers(array) {
    const shuffled = array.slice().reverse();
    shuffled.forEach((item, index, arr) => {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      arr[index] = arr[randomIndex];
      arr[randomIndex] = item;
    });
    return shuffled;
  }

  renderAnswers() {
    const {
      data: {
        incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer,
      },
    } = this.props;
    const answers = [...incorrectAnswers, correctAnswer];
    const shuffledAnswers = this.shuffleAnswers(answers);
    return shuffledAnswers.map((answer) => (
      answers.indexOf(answer) === answers.length - 1
        ? <Answer key={ answer } text={ answer } dataTestId="correct-answer" />
        : (
          <Answer
            key={ answer }
            text={ answer }
            dataTestId={ `wrong-answer-${answers.indexOf(answer)}` }
          />
        )
    ));
  }

  render() {
    const { data: { category, question } } = this.props;

    return (
      <section className="question-game">
        <h2 data-testid="question-category">{ category }</h2>
        <p data-testid="question-text">{ question }</p>
        { this.renderAnswers() }
      </section>
    );
  }
}

Question.propTypes = {
  data: shape({
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }),
}.isRequired;
