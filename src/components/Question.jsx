import React, { Component } from 'react';
import { shape, string, arrayOf, func } from 'prop-types';
import { connect } from 'react-redux';
import Answer from './Answer';
import { handleAssertion } from '../actions';

class Question extends Component {
  constructor(props) {
    super(props);

    const {
      data: {
        incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer,
      },
    } = this.props;

    this.state = {
      clicked: false,
      answers: [...incorrectAnswers, correctAnswer],
      shuffledAnswers: this.shuffleAnswers([...incorrectAnswers, correctAnswer]),
    };
    this.handleClick = this.handleClick.bind(this);
    this.showNextQuestionButton = this.showNextQuestionButton.bind(this);
  }

  handleClick(e) {
    const { innerText } = e.target;
    const { sumScore, data: { difficulty } } = this.props;
    const { answers, timer } = this.state;
    this.setState(
      { clicked: true },
      () => {
        if (answers.indexOf(innerText) === answers.length - 1) {
          sumScore(timer * difficulty);
        }
      },
    );
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
    const { clicked, answers, shuffledAnswers } = this.state;
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
    const { clicked } = this.state;
    return (
      <>
        <section className="question-game">
          <h2 data-testid="question-category">{ category }</h2>
          <p data-testid="question-text">{ question }</p>
          { this.renderAnswers() }
        </section>
        { clicked && this.showNextQuestionButton() }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sumScore: (timer, difficulty) => dispatch(handleAssertion(timer, difficulty)),
});

Question.propTypes = {
  data: shape({
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }),
  sumScore: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Question);
