import React, { Component } from 'react';
import { shape, string, arrayOf } from 'prop-types';
import Answer from './Answer';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      timer: 30,
    };
    this.renderAnswers = this.renderAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showNextQuestionButton = this.showNextQuestionButton.bind(this);
  }

  tick() {
    this.setState(state => ({
      timer: state.timer - 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  handleClick() {
    this.setState({ clicked: true });
  }

  showNextQuestionButton() {
    return (
      <button type="button" data-testid="btn-next">
        Próxima
      </button>
    );
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
    const { clicked, timer } = this.state;
    const answers = [...incorrectAnswers, correctAnswer];
    const shuffledAnswers = this.shuffleAnswers(answers);
    return shuffledAnswers.map((answer) => (
      answers.indexOf(answer) === answers.length - 1
        ? (
          <Answer
            key={ answer }
            text={ answer }
            dataTestId="correct-answer"
            isClicked={ clicked ? 'yes' : '' }
            onHandleClick={ this.handleClick }
          />
        )
        : (
          <Answer
            key={ answer }
            text={ answer }
            dataTestId={ `wrong-answer-${answers.indexOf(answer)}` }
            isClicked={ clicked ? 'no' : '' }
            onHandleClick={ this.handleClick }
          />
        )
    ));
  }

  render() {
    const { data: { category, question } } = this.props;
    const { clicked, timer } = this.state;
    return (
      <>
        <section className="question-game">
          <h2 data-testid="question-category">{ category }</h2>
          <p data-testid="question-text">{ question }</p>
          { this.renderAnswers() }
        </section>
        { clicked && this.showNextQuestionButton() }
        <div>
          {timer > 0 ? <p>{ timer }</p> : <p>0</p>}
        </div>
      </>
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

// botao feito por let
